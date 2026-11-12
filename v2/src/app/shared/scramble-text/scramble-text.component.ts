import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';
import { gsap } from 'gsap';

/** Alfabeto usado por defecto durante el caos aleatorio. */
export const DEFAULT_SCRAMBLE_CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%&*+-=<>[]{}';

interface ScrambleChar {
  final: string;
  isWhitespace: boolean;
  /** Último glifo mostrado (final o aleatorio). */
  current: string;
  /** Punto normalizado (0–1) en el que este carácter queda fijado. */
  revealAt: number;
}

/** Divide el texto en grafemas reales (emoji, acentos combinados, etc.). */
function splitGraphemes(text: string): string[] {
  type GraphemeSegmenter = new (
    locale?: string,
    options?: { granularity: 'grapheme' },
  ) => {
    segment: (input: string) => Iterable<{ segment: string }>;
  };

  const Segmenter = (Intl as typeof Intl & { Segmenter?: GraphemeSegmenter })
    .Segmenter;

  if (Segmenter) {
    return Array.from(
      new Segmenter('es', { granularity: 'grapheme' }).segment(text),
      (part) => part.segment,
    );
  }

  return Array.from(text);
}

function randomGlyph(glyphs: readonly string[]): string {
  return glyphs[Math.floor(Math.random() * glyphs.length)] ?? '';
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}

/**
 * Efecto de revelación aleatoria tipo "Matrix" / "Cyberpunk" usando GSAP.
 *
 * Al ser un componente con selector de atributo puede aplicarse sobre
 * cualquier etiqueta semántica:
 *
 *   <h1 appScrambleText text="MORLOC IS BACK" [speed]="1.4"></h1>
 *
 * Repetir la animación mediante la API pública o mediante el evento
 * declarativo `scramble:play`:
 *
 *   @ViewChildren(ScrambleTextComponent) items!: QueryList<ScrambleTextComponent>;
 *   this.items.forEach((item) => item.play());
 *
 *   element.dispatchEvent(new CustomEvent('scramble:play'));
 *
 * Eventos emitidos en el elemento anfitrión:
 *   - scramble:start → al comenzar (o reiniciarse) la animación.
 *   - scramble:end   → cuando todas las letras quedaron fijadas.
 */
@Component({
  selector: '[appScrambleText]',
  standalone: false,
  templateUrl: './scramble-text.component.html',
  styleUrl: './scramble-text.component.scss',
  host: {
    '[attr.data-scramble-text]': 'text',
    '[attr.data-scramble-state]': 'state()',
  },
})
export class ScrambleTextComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  /** Texto final que se muestra al terminar la animación. */
  @Input({ required: true }) text = '';

  /** Duración total de la animación en segundos. */
  @Input() speed = 1.2;

  /** Retardo antes de iniciar, en segundos. */
  @Input() delay = 0;

  /** Caracteres usados durante el caos aleatorio. */
  @Input() characters = DEFAULT_SCRAMBLE_CHARSET;

  /** Reproducir al entrar en el viewport (una sola vez). */
  @Input() playOnView = false;

  /** Respetar prefers-reduced-motion mostrando el texto final sin animar. */
  @Input() respectReducedMotion = true;

  protected readonly state = signal<'idle' | 'playing'>('idle');

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private output: HTMLElement | null = null;
  private states: ScrambleChar[] = [];
  private glyphs: string[] = [];
  private tween: gsap.core.Tween | null = null;
  private observer: IntersectionObserver | null = null;
  private frameId: number | null = null;
  private lastScramble = 0;
  private viewReady = false;

  ngAfterViewInit(): void {
    this.output = this.host.nativeElement.querySelector<HTMLElement>(
      '[data-scramble-output]',
    );
    this.rebuildStates();
    this.viewReady = true;

    this.host.nativeElement.addEventListener(
      'scramble:play',
      this.handlePlayEvent,
    );

    if (!this.output) {
      return;
    }

    if (this.playOnView) {
      this.observeViewport();
      return;
    }

    // Arrancar en el siguiente frame para no bloquear el primer render.
    this.schedulePlay();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'] || changes['characters']) {
      this.rebuildStates();

      if (this.viewReady && changes['text']) {
        this.restoreFinalText();
      }
    }
  }

  ngOnDestroy(): void {
    this.cancelPlayback();
    this.observer?.disconnect();
    this.host.nativeElement.removeEventListener(
      'scramble:play',
      this.handlePlayEvent,
    );
    this.output = null;
  }

  /** Inicia (o reinicia) la animación. */
  play(): void {
    if (!this.output) {
      return;
    }

    this.cancelPlayback();
    this.state.set('playing');
    this.emit('scramble:start');

    // Accesibilidad: si el usuario prefiere menos movimiento, texto final ya.
    if (this.respectReducedMotion && this.prefersReducedMotion()) {
      this.finish();
      return;
    }

    // Reiniciar el caos y barajar el orden de fijación en cada reproducción.
    this.randomizeSchedule();

    for (const char of this.states) {
      char.current = char.isWhitespace
        ? char.final
        : randomGlyph(this.glyphs);
    }

    this.output.textContent = this.states
      .map((char) => char.current)
      .join('');

    const progress = { value: 0 };

    this.tween = gsap.to(progress, {
      value: 1,
      duration: clampNumber(this.speed, 0.2, 20),
      delay: clampNumber(this.delay, 0, 10),
      ease: 'none',
      onUpdate: () => this.render(progress.value),
      onComplete: () => this.finish(),
    });
  }

  private readonly handlePlayEvent = (): void => {
    this.play();
  };

  private rebuildStates(): void {
    const charset = (this.characters ?? '').trim() || DEFAULT_SCRAMBLE_CHARSET;

    this.glyphs = Array.from(charset);
    this.states = splitGraphemes(this.text).map((character) => ({
      final: character,
      isWhitespace: /^\s$/u.test(character),
      current: character,
      revealAt: 1,
    }));
  }

  /**
   * Asigna a cada carácter un momento de "fijación" con un pequeño desorden.
   * Las letras se estabilizan de izquierda a derecha sin terminar todas en el
   * mismo frame.
   */
  private randomizeSchedule(): void {
    const total = Math.max(1, this.states.length);

    this.states.forEach((char, index) => {
      if (char.isWhitespace) {
        char.revealAt = 0;
        return;
      }

      const order = total === 1 ? 1 : index / (total - 1);
      const jitter = (Math.random() - 0.5) * 0.18;
      char.revealAt = gsap.utils.clamp(0.3, 0.95, 0.35 + order * 0.5 + jitter);
    });
  }

  /** Compone el texto visible para un progreso 0–1. */
  private render(progress: number): void {
    if (!this.output) {
      return;
    }

    const now = performance.now();

    // Limitar los cambios de glifo a ~22 fps: menos repintados, misma estética.
    const shouldScramble = now - this.lastScramble > 45;

    if (shouldScramble) {
      this.lastScramble = now;
    }

    let nextText = '';

    for (const char of this.states) {
      if (char.isWhitespace || progress >= char.revealAt) {
        char.current = char.final;
      } else if (shouldScramble) {
        char.current = randomGlyph(this.glyphs);
      }

      nextText += char.current;
    }

    if (this.output.textContent !== nextText) {
      this.output.textContent = nextText;
    }
  }

  private finish(): void {
    if (this.output) {
      // Al terminar volvemos a un único nodo de texto: así el layout final es
      // idéntico al de la capa de medida, sin redondeos por spans.
      this.output.textContent = this.text;
    }

    for (const char of this.states) {
      char.current = char.final;
    }

    this.state.set('idle');
    this.emit('scramble:end');
  }

  private restoreFinalText(): void {
    this.cancelPlayback();

    if (this.output) {
      this.output.textContent = this.text;
    }

    for (const char of this.states) {
      char.current = char.final;
    }

    this.state.set('idle');
  }

  private observeViewport(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.schedulePlay();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries, currentObserver) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          currentObserver.disconnect();
          this.observer = null;
          this.play();
        }
      },
      { threshold: 0.35 },
    );

    this.observer.observe(this.host.nativeElement);
  }

  private schedulePlay(): void {
    this.cancelFrame();

    this.frameId = requestAnimationFrame(() => {
      this.frameId = null;
      this.play();
    });
  }

  private cancelPlayback(): void {
    this.cancelFrame();
    this.tween?.kill();
    this.tween = null;
  }

  private cancelFrame(): void {
    if (this.frameId === null) {
      return;
    }

    cancelAnimationFrame(this.frameId);
    this.frameId = null;
  }

  private prefersReducedMotion(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  private emit(name: 'scramble:start' | 'scramble:end'): void {
    this.host.nativeElement.dispatchEvent(
      new CustomEvent(name, { bubbles: true }),
    );
  }
}

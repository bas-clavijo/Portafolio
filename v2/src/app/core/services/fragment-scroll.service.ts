import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/**
 * Garantiza el scroll al fragmento de la URL después de que la vista se haya
 * renderizado. El scroll nativo del router puede ejecutarse antes de que un
 * módulo lazy inserte su contenido, especialmente al navegar desde otra ruta.
 */
@Injectable({ providedIn: 'root' })
export class FragmentScrollService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private frameId: number | null = null;
  private fallbackTimer: ReturnType<typeof setTimeout> | null = null;
  private attempts = 0;

  constructor() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => this.scheduleScroll(event.urlAfterRedirects));

    this.destroyRef.onDestroy(() => this.cancelScheduledScroll());
  }

  private scheduleScroll(url: string): void {
    const fragment = this.router.parseUrl(url).fragment;

    this.cancelScheduledScroll();

    if (!fragment) {
      return;
    }

    this.attempts = 0;
    this.scrollToFragment(fragment);
  }

  private scrollToFragment(fragment: string): void {
    const target = this.document.getElementById(fragment);

    if (!target) {
      if (
        this.attempts >= 30 ||
        typeof requestAnimationFrame !== 'function'
      ) {
        return;
      }

      this.attempts += 1;
      this.frameId = requestAnimationFrame(() => {
        this.frameId = null;
        this.scrollToFragment(fragment);
      });
      return;
    }

    const view = this.document.defaultView;
    const startY = view?.scrollY ?? 0;

    target.scrollIntoView({ block: 'start' });

    // Si el navegador no animó el scroll (por ejemplo, una pestaña sin foco),
    // forzamos el salto para que el ancla siempre quede visible.
    this.fallbackTimer = setTimeout(() => {
      this.fallbackTimer = null;

      const moved = Math.abs((view?.scrollY ?? startY) - startY) > 1;
      const targetTop = target.getBoundingClientRect().top;

      if (!moved && Math.abs(targetTop) > 2) {
        target.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    }, 300);
  }

  private cancelScheduledScroll(): void {
    this.cancelFrame();

    if (this.fallbackTimer !== null) {
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = null;
    }
  }

  private cancelFrame(): void {
    if (this.frameId === null) {
      return;
    }

    if (typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(this.frameId);
    }

    this.frameId = null;
  }
}

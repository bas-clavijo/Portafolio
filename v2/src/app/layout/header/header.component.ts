import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface NavItem {
  readonly title: string;
  readonly label: string;
  readonly fragment?: string;
  readonly href?: string;
}

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {
  protected readonly navItems: readonly NavItem[] = [
    { title: 'Experiencia', label: 'experiencia', fragment: 'experiencia' },
    { title: 'Acerca de', label: 'acercade', fragment: 'acercade' },
    {
      title: 'Contacto',
      label: 'contacto',
      href: 'mailto:bas.clavijo@gmail.com',
    },
  ];

  protected readonly activeSection = signal<string | null>(null);

  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private observer: IntersectionObserver | null = null;
  private observeFrame: number | null = null;
  private observeAttempts = 0;

  constructor() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.scheduleSectionObservation());

    this.destroyRef.onDestroy(() => {
      this.observer?.disconnect();
      this.cancelFrame();
    });
  }

  ngAfterViewInit(): void {
    this.scheduleSectionObservation();
  }

  private scheduleSectionObservation(): void {
    this.cancelFrame();
    this.observeAttempts = 0;

    if (typeof requestAnimationFrame !== 'function') {
      this.observeSections();
      return;
    }

    this.observeFrame = requestAnimationFrame(() => {
      this.observeFrame = null;
      this.observeSections();
    });
  }

  private observeSections(): void {
    this.observer?.disconnect();

    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const sections = this.document.querySelectorAll<HTMLElement>(
      'section[id]',
    );

    // Al navegar desde otra ruta, el módulo lazy puede tardar algunos frames
    // en insertar sus secciones.
    if (sections.length === 0) {
      if (
        this.observeAttempts >= 60 ||
        typeof requestAnimationFrame !== 'function'
      ) {
        return;
      }

      this.observeAttempts += 1;
      this.observeFrame = requestAnimationFrame(() => {
        this.observeFrame = null;
        this.observeSections();
      });
      return;
    }

    this.activeSection.set(null);

    this.observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          this.activeSection.set(
            visibleEntries[visibleEntries.length - 1].target.id,
          );
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.3 },
    );

    sections.forEach((section) => this.observer?.observe(section));
  }

  private cancelFrame(): void {
    if (this.observeFrame === null) {
      return;
    }

    if (typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(this.observeFrame);
    }

    this.observeFrame = null;
  }
}

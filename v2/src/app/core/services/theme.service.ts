import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  Injectable,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeOption {
  readonly value: Theme;
  readonly label: string;
}

/**
 * Opciones mostradas en el menú del selector de tema.
 * Se mantienen aquí para que cualquier componente pueda reutilizarlas.
 */
export const THEME_OPTIONS: readonly ThemeOption[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

const THEME_STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly darkMediaQuery =
    this.isBrowser && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;

  /** Preferencia elegida por el usuario. */
  readonly theme = signal<Theme>('system');

  /** Resultado efectivo de aplicar la preferencia (incluye `system`). */
  readonly isDark = signal(false);

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    const storedTheme = this.readStoredTheme();
    this.theme.set(storedTheme);
    this.applyTheme(storedTheme);

    this.darkMediaQuery?.addEventListener(
      'change',
      this.handleSystemThemeChange,
    );

    this.destroyRef.onDestroy(() => {
      this.darkMediaQuery?.removeEventListener(
        'change',
        this.handleSystemThemeChange,
      );
    });
  }

  /** Guarda la preferencia y aplica el tema de inmediato. */
  setTheme(theme: Theme): void {
    this.theme.set(theme);

    if (!this.isBrowser) {
      return;
    }

    this.persistTheme(theme);
    this.applyTheme(theme);
  }

  private readonly handleSystemThemeChange = (): void => {
    if (this.theme() === 'system') {
      this.applyTheme('system');
    }
  };

  private applyTheme(theme: Theme): void {
    const prefersDark = this.darkMediaQuery?.matches ?? false;
    const isDark = theme === 'dark' || (theme === 'system' && prefersDark);

    this.document.documentElement.classList.toggle('dark', isDark);
    this.isDark.set(isDark);
  }

  private readStoredTheme(): Theme {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);

      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    } catch {
      // El almacenamiento puede no estar disponible (modo privado, políticas).
    }

    return 'system';
  }

  private persistTheme(theme: Theme): void {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Si no se puede persistir, el tema se mantiene durante la sesión.
    }
  }
}

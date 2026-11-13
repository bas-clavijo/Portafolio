import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import {
  THEME_OPTIONS,
  Theme,
  ThemeService,
} from '@core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: false,
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);
  protected readonly themeOptions = THEME_OPTIONS;
  protected readonly isOpen = signal(false);

  protected toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isOpen.update((open) => !open);
  }

  protected selectTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
    this.isOpen.set(false);
  }

  @HostListener('document:click')
  protected closeMenu(): void {
    this.isOpen.set(false);
  }
}

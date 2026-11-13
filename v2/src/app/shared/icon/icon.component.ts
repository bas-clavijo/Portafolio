import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** Nombres de iconos disponibles en la aplicación. */
export type IconName =
  | 'briefcase'
  | 'user-check'
  | 'mail'
  | 'linkedin'
  | 'chevron-right'
  | 'sun'
  | 'moon'
  | 'system';

/**
 * Trazos SVG centralizados. Todos los iconos comparten el mismo viewBox,
 * grosor de línea y terminaciones para mantener una estética consistente.
 */
const ICON_PATHS: Record<IconName, readonly string[]> = {
  briefcase: [
    'M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',
    'M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2',
    'M12 12l0 .01',
    'M3 13a20 20 0 0 0 18 0',
  ],
  'user-check': [
    'M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0',
    'M6 21v-2a4 4 0 0 1 4 -4h4',
    'M15 19l2 2l4 -4',
  ],
  mail: [
    'M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5',
    'M3 6l9 6l9 -6',
    'M15 18h6',
    'M18 15l3 3l-3 3',
  ],
  linkedin: [
    'M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z',
    'M8 11l0 5',
    'M8 8l0 .01',
    'M12 16l0 -5',
    'M16 16v-3a2 2 0 0 0 -4 0',
  ],
  'chevron-right': ['M9 6l6 6l-6 6'],
  sun: [
    'M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0',
    'M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7',
  ],
  moon: [
    'M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z',
  ],
  system: [
    'M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10z',
    'M7 20h10',
    'M9 16v4',
    'M15 16v4',
  ],
};

@Component({
  selector: 'app-icon',
  standalone: false,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  /** Icono que se dibuja dentro del contenedor. */
  @Input({ required: true }) icon: IconName = 'briefcase';

  protected get paths(): readonly string[] {
    return ICON_PATHS[this.icon] ?? [];
  }
}

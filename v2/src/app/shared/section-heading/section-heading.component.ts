import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconName } from '@shared/icon/icon.component';

/**
 * Encabezado común de las secciones del portafolio.
 * Centraliza el tamaño, el espaciado y el icono para que cada feature no
 * replique el mismo marcado.
 */
@Component({
  selector: 'app-section-heading',
  standalone: false,
  templateUrl: './section-heading.component.html',
  styleUrl: './section-heading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeadingComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) icon: IconName = 'briefcase';
}

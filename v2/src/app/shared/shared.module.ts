import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BadgeComponent } from './badge/badge.component';
import { IconComponent } from './icon/icon.component';
import { LinkInlineComponent } from './link-inline/link-inline.component';
import { ScrambleTextComponent } from './scramble-text/scramble-text.component';
import { SectionContainerComponent } from './section-container/section-container.component';
import { SectionHeadingComponent } from './section-heading/section-heading.component';
import { SocialPillComponent } from './social-pill/social-pill.component';

const SHARED_COMPONENTS = [
  BadgeComponent,
  IconComponent,
  LinkInlineComponent,
  ScrambleTextComponent,
  SectionContainerComponent,
  SectionHeadingComponent,
  SocialPillComponent,
];

/**
 * Componentes de interfaz reutilizables por cualquier feature.
 * El shell de la aplicación (header, footer y selector de tema) vive en
 * `LayoutModule` para no mezclar layout con UI compartida.
 */
@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [CommonModule],
  exports: [CommonModule, ...SHARED_COMPONENTS],
})
export class SharedModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

const LAYOUT_COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  ThemeToggleComponent,
];

/**
 * Shell de la aplicación: navegación, pie de página y selector de tema.
 * Se importa una sola vez desde `AppModule`.
 */
@NgModule({
  declarations: [...LAYOUT_COMPONENTS],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [...LAYOUT_COMPONENTS],
})
export class LayoutModule {}

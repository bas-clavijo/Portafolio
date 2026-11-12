import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BadgeComponent } from './badge/badge.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LinkInlineComponent } from './link-inline/link-inline.component';
import { ScrambleTextComponent } from './scramble-text/scramble-text.component';
import { SectionContainerComponent } from './section-container/section-container.component';
import { SocialPillComponent } from './social-pill/social-pill.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

const SHARED_COMPONENTS = [
  BadgeComponent,
  FooterComponent,
  HeaderComponent,
  LinkInlineComponent,
  ScrambleTextComponent,
  SectionContainerComponent,
  SocialPillComponent,
  ThemeToggleComponent,
];

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [CommonModule],
  exports: [CommonModule, ...SHARED_COMPONENTS],
})
export class SharedModule {}

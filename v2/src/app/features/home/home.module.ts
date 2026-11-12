import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { ExperienceItemComponent } from './components/experience-item/experience-item.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    ExperienceComponent,
    ExperienceItemComponent,
    AboutComponent,
  ],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}

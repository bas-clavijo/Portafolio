import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ScrambleDemoRoutingModule } from './scramble-demo-routing.module';
import { ScrambleDemoComponent } from './scramble-demo.component';

@NgModule({
  declarations: [ScrambleDemoComponent],
  imports: [SharedModule, ScrambleDemoRoutingModule],
})
export class ScrambleDemoModule {}

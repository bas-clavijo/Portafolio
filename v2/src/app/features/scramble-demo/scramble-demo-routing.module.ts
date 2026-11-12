import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrambleDemoComponent } from './scramble-demo.component';

const routes: Routes = [
  {
    path: '',
    component: ScrambleDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScrambleDemoRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Portafolio Web Bastián Clavijo Llanten',
    loadChildren: () =>
      import('./features/home/home.module').then((module) => module.HomeModule),
  },
  {
    path: 'scramble-demo',
    title: 'Scramble Text · Demo',
    loadChildren: () =>
      import('./features/scramble-demo/scramble-demo.module').then(
        (module) => module.ScrambleDemoModule,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

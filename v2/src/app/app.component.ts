import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FragmentScrollService } from '@core/services/fragment-scroll.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {
    // Se instancia al arrancar para escuchar la navegación por fragmentos.
    inject(FragmentScrollService);
  }
}

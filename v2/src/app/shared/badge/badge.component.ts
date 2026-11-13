import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: false,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {}

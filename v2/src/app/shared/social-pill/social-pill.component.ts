import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-pill',
  standalone: false,
  templateUrl: './social-pill.component.html',
  styleUrl: './social-pill.component.scss',
})
export class SocialPillComponent {
  @Input({ required: true }) href = '';
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-experience-item',
  standalone: false,
  templateUrl: './experience-item.component.html',
  styleUrl: './experience-item.component.scss',
})
export class ExperienceItemComponent {
  @Input({ required: true }) date = '';
  @Input({ required: true }) title = '';
  @Input({ required: true }) company = '';
  @Input({ required: true }) description = '';
  @Input() link?: string;
}

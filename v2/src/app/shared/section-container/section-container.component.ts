import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-container',
  standalone: false,
  templateUrl: './section-container.component.html',
  styleUrl: './section-container.component.scss',
})
export class SectionContainerComponent {
  @Input() id?: string;
  @Input('section-class') sectionClass = '';
}

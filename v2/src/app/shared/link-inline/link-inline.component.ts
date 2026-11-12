import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link-inline',
  standalone: false,
  templateUrl: './link-inline.component.html',
  styleUrl: './link-inline.component.scss',
})
export class LinkInlineComponent {
  @Input({ required: true }) href = '';
}

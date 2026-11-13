import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXPERIENCES } from '../../data/experience.data';
import { Experience } from '../../models/experience.model';

@Component({
  selector: 'app-experience',
  standalone: false,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  protected readonly experiences: readonly Experience[] = EXPERIENCES;
}

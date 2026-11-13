import {
  ChangeDetectionStrategy,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  DEFAULT_SCRAMBLE_CHARSET,
  ScrambleTextComponent,
} from '@shared/scramble-text/scramble-text.component';
import { SCRAMBLE_EXAMPLES, ScrambleExample } from './data/demo-examples';

@Component({
  selector: 'app-scramble-demo',
  standalone: false,
  templateUrl: './scramble-demo.component.html',
  styleUrl: './scramble-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrambleDemoComponent {
  protected readonly examples: readonly ScrambleExample[] = SCRAMBLE_EXAMPLES;
  protected readonly defaultCharset = DEFAULT_SCRAMBLE_CHARSET;

  protected readonly componentUsage = `<h1
  appScrambleText
  text="SYSTEM ONLINE"
  [speed]="1.4"
  class="text-5xl font-mono"
></h1>`;

  protected readonly replayUsage = `@ViewChildren(ScrambleTextComponent)
scrambleTexts!: QueryList<ScrambleTextComponent>;

replayAll(): void {
  this.scrambleTexts.forEach(
    (item) => item.play()
  );
}`;

  @ViewChildren(ScrambleTextComponent)
  private readonly scrambleTexts!: QueryList<ScrambleTextComponent>;

  /** Reinicia todas las instancias de la página. */
  protected replayAll(): void {
    this.scrambleTexts.forEach((item) => item.play());
  }
}

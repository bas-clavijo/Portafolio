import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { ScrambleTextComponent } from '@shared/scramble-text/scramble-text.component';
import { ScrambleDemoComponent } from './scramble-demo.component';
import { ScrambleDemoModule } from './scramble-demo.module';

describe('ScrambleDemoComponent', () => {
  beforeEach(async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    );

    await TestBed.configureTestingModule({
      imports: [ScrambleDemoModule],
    }).compileComponents();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should render the MORLOC IS BACK title', () => {
    const fixture = TestBed.createComponent(ScrambleDemoComponent);
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('#demo-title');

    expect(title.textContent).toContain('MORLOC IS BACK');
  });

  it('should replay every scramble text when the button is clicked', () => {
    const fixture = TestBed.createComponent(ScrambleDemoComponent);
    fixture.detectChanges();

    const instances = fixture.debugElement
      .queryAll(By.directive(ScrambleTextComponent))
      .map((debugElement) =>
        debugElement.injector.get(ScrambleTextComponent),
      );

    const spies = instances.map((instance) => vi.spyOn(instance, 'play'));

    const button = fixture.nativeElement.querySelector(
      'button[type="button"]',
    ) as HTMLButtonElement;

    button.click();

    spies.forEach((spy) => expect(spy).toHaveBeenCalledTimes(1));
  });
});

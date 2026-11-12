import { TestBed } from '@angular/core/testing';
import { ScrambleTextComponent } from './scramble-text.component';

describe('ScrambleTextComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScrambleTextComponent],
    }).compileComponents();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should render the accessible text and the measured layer', () => {
    const fixture = TestBed.createComponent(ScrambleTextComponent);
    fixture.componentRef.setInput('text', 'MORLOC IS BACK');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain('MORLOC IS BACK');
    expect(element.getAttribute('data-scramble-text')).toBe('MORLOC IS BACK');
    expect(element.querySelector('.scramble-text__sr')?.textContent).toBe(
      'MORLOC IS BACK',
    );
  });

  it('should finish immediately when reduced motion is preferred', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    );

    const fixture = TestBed.createComponent(ScrambleTextComponent);
    const component = fixture.componentInstance;
    const started = vi.fn();

    fixture.componentRef.setInput('text', 'MORLOC IS BACK');
    fixture.detectChanges();

    (fixture.nativeElement as HTMLElement).addEventListener(
      'scramble:start',
      started,
    );

    component.play();
    fixture.detectChanges();

    const output = fixture.nativeElement.querySelector(
      '[data-scramble-output]',
    ) as HTMLElement;

    expect(started).toHaveBeenCalledTimes(1);
    expect(output.textContent).toBe('MORLOC IS BACK');
    expect(
      (fixture.nativeElement as HTMLElement).getAttribute(
        'data-scramble-state',
      ),
    ).toBe('idle');
  });
});

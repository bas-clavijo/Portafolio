import { TestBed } from '@angular/core/testing';
import { LayoutModule } from '@layout/layout.module';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutModule],
    }).compileComponents();
  });

  it('should render the current year and the author link', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const currentYear = new Date().getFullYear().toString();

    expect(element.textContent).toContain(currentYear);
    expect(element.querySelector('a')?.textContent).toContain(
      'Bastian clavijo Llanten',
    );
  });
});

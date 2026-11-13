import { TestBed } from '@angular/core/testing';
import { SharedModule } from '@shared/shared.module';
import { SectionHeadingComponent } from './section-heading.component';

describe('SectionHeadingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();
  });

  it('should render the title and the requested icon', () => {
    const fixture = TestBed.createComponent(SectionHeadingComponent);
    fixture.componentRef.setInput('title', 'Experiencia Laboral');
    fixture.componentRef.setInput('icon', 'briefcase');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h2')?.textContent).toContain(
      'Experiencia Laboral',
    );
    expect(element.querySelector('app-icon path')).not.toBeNull();
  });
});

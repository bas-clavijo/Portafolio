import { TestBed } from '@angular/core/testing';
import { SectionContainerComponent } from './section-container.component';

describe('SectionContainerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionContainerComponent],
    }).compileComponents();
  });

  it('should set the section id, data-section and extra classes', () => {
    const fixture = TestBed.createComponent(SectionContainerComponent);
    fixture.componentRef.setInput('id', 'experiencia');
    fixture.componentRef.setInput('section-class', 'mb-12');
    fixture.detectChanges();

    const section = fixture.nativeElement.querySelector('section') as HTMLElement;

    expect(section.id).toBe('experiencia');
    expect(section.getAttribute('data-section')).toBe('experiencia');
    expect(section.classList).toContain('mb-12');
  });
});

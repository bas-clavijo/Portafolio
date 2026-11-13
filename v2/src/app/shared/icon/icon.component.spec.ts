import { TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconComponent],
    }).compileComponents();
  });

  it('should render the paths for the requested icon', () => {
    const fixture = TestBed.createComponent(IconComponent);
    fixture.componentRef.setInput('icon', 'mail');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('path').length).toBe(4);
  });
});

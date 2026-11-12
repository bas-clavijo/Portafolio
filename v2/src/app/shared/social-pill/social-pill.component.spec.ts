import { TestBed } from '@angular/core/testing';
import { SocialPillComponent } from './social-pill.component';

describe('SocialPillComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialPillComponent],
    }).compileComponents();
  });

  it('should render the href and projected content', () => {
    const fixture = TestBed.createComponent(SocialPillComponent);
    fixture.componentRef.setInput('href', 'mailto:test@example.com');
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;

    expect(link.getAttribute('href')).toBe('mailto:test@example.com');
    expect(link.getAttribute('target')).toBe('_blank');
  });
});

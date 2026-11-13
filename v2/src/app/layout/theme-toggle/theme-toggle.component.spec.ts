import { TestBed } from '@angular/core/testing';
import { ThemeService } from '@core/services/theme.service';
import { LayoutModule } from '@layout/layout.module';
import { ThemeToggleComponent } from './theme-toggle.component';

describe('ThemeToggleComponent', () => {
  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');

    await TestBed.configureTestingModule({
      imports: [LayoutModule],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('should apply the selected theme from the menu', () => {
    const fixture = TestBed.createComponent(ThemeToggleComponent);
    const themeService = TestBed.inject(ThemeService);

    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll(
      '.themes-menu-option',
    ) as NodeListOf<HTMLElement>;

    options[1].click();
    fixture.detectChanges();

    expect(themeService.theme()).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(
      fixture.nativeElement.querySelector('#themes-menu').classList,
    ).not.toContain('open');
  });
});

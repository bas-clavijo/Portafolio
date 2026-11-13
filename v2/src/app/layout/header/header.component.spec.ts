import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LayoutModule } from '@layout/layout.module';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutModule],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should render the navigation links', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('nav a');

    expect(links.length).toBe(3);
    expect(links[0].textContent).toContain('Experiencia');
    expect(links[1].textContent).toContain('Acerca de');
    expect(links[2].textContent).toContain('Contacto');
  });
});

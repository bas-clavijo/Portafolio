import { TestBed } from '@angular/core/testing';
import { HomeModule } from './home.module';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeModule],
    }).compileComponents();
  });

  it('should render the hero and the main sections', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain(
      'Hey soy,Bastian Clavijo Llanten',
    );
    expect(element.querySelector('#experiencia')).not.toBeNull();
    expect(element.querySelector('#acercade')).not.toBeNull();
  });
});

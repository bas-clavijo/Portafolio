import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { FragmentScrollService } from './fragment-scroll.service';

describe('FragmentScrollService', () => {
  let target: HTMLElement;

  beforeEach(() => {
    target = document.createElement('section');
    target.id = 'experiencia';
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
  });

  afterEach(() => {
    target.remove();
    vi.restoreAllMocks();
  });

  it('should scroll to the element referenced by the URL fragment', async () => {
    const router = TestBed.inject(Router);
    TestBed.inject(FragmentScrollService);

    await router.navigate([], { fragment: 'experiencia' });

    expect(target.scrollIntoView).toHaveBeenCalledWith({ block: 'start' });
  });
});

import { TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BadgeComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BadgeComponent);

    expect(fixture.componentInstance).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footr } from './footr';

describe('Footr', () => {
  let component: Footr;
  let fixture: ComponentFixture<Footr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Footr);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

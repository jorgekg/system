import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingRatingComponent } from './scheduling-rating.component';

describe('SchedulingRatingComponent', () => {
  let component: SchedulingRatingComponent;
  let fixture: ComponentFixture<SchedulingRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

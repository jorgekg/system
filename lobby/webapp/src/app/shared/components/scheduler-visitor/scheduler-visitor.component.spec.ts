import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerVisitorComponent } from './scheduler-visitor.component';

describe('SchedulerVisitorComponent', () => {
  let component: SchedulerVisitorComponent;
  let fixture: ComponentFixture<SchedulerVisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerVisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

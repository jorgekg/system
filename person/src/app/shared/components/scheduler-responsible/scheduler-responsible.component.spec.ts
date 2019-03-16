import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerResponsibleComponent } from './scheduler-responsible.component';

describe('SchedulerResponsibleComponent', () => {
  let component: SchedulerResponsibleComponent;
  let fixture: ComponentFixture<SchedulerResponsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerResponsibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

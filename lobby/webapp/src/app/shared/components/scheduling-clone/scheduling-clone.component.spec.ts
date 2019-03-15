import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingCloneComponent } from './scheduling-clone.component';

describe('SchedulingCloneComponent', () => {
  let component: SchedulingCloneComponent;
  let fixture: ComponentFixture<SchedulingCloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingCloneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingCloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

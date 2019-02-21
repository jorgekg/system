import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingPersistComponent } from './scheduling-persist.component';

describe('SchedulingPersistComponent', () => {
  let component: SchedulingPersistComponent;
  let fixture: ComponentFixture<SchedulingPersistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingPersistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingPersistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

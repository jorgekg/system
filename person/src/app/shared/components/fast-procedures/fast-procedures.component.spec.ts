import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastProceduresComponent } from './fast-procedures.component';

describe('FastProceduresComponent', () => {
  let component: FastProceduresComponent;
  let fixture: ComponentFixture<FastProceduresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastProceduresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

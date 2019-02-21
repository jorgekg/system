import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastPersonComponent } from './fast-person.component';

describe('FastPersonComponent', () => {
  let component: FastPersonComponent;
  let fixture: ComponentFixture<FastPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

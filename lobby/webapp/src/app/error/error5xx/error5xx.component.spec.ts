import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Error5xxComponent } from './error5xx.component';

describe('Error5xxComponent', () => {
  let component: Error5xxComponent;
  let fixture: ComponentFixture<Error5xxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Error5xxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Error5xxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

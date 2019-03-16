import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonOnListComponent } from './person-on-list.component';

describe('PersonOnListComponent', () => {
  let component: PersonOnListComponent;
  let fixture: ComponentFixture<PersonOnListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonOnListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonOnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

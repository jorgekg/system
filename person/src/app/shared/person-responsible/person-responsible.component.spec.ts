import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonResponsibleComponent } from './person-responsible.component';

describe('PersonResponsibleComponent', () => {
  let component: PersonResponsibleComponent;
  let fixture: ComponentFixture<PersonResponsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonResponsibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

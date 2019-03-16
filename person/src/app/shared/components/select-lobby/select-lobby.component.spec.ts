import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLobbyComponent } from './select-lobby.component';

describe('SelectLobbyComponent', () => {
  let component: SelectLobbyComponent;
  let fixture: ComponentFixture<SelectLobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectLobbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

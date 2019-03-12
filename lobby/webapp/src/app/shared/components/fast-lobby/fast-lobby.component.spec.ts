import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastLobbyComponent } from './fast-lobby.component';

describe('FastLobbyComponent', () => {
  let component: FastLobbyComponent;
  let fixture: ComponentFixture<FastLobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastLobbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Lobby } from './../../../core/entities/lobby/lobby.service';
import { AppStorageService } from './../../../core/app-storage/app-storage.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

const showSelectLobby = () => {
  const wd = window as any;
  wd.jQuery(`#select-lobby`).modal(`show`);
};

@Component({
  selector: 'app-select-lobby',
  templateUrl: './select-lobby.component.html',
  styleUrls: ['./select-lobby.component.css']
})
export class SelectLobbyComponent implements OnInit {

  @Output() changeLobby = new EventEmitter();

  public lobbyList = [] as Lobby[];

  constructor(
    private appStorageService: AppStorageService
  ) { }

  ngOnInit() {
    this.lobbyList = this.appStorageService.getLobbies();
    showSelectLobby();
  }

}

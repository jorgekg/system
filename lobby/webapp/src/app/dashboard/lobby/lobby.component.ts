import { Component, OnInit, AfterViewInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';

import { LobbyService, Lobby } from './../../core/entities/lobby/lobby.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LobbyComponent implements OnInit {

  public lobbyList = [] as Lobby[];
  public totalPages = 0;
  private atualPage = 0;
  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private lobbyService: LobbyService
  ) { }

  ngOnInit() {
    this.getLobby();
  }

  private async getLobby() {
    this.lobbyList = this.activedRoute.snapshot.data.lobbies.contents;
    this.totalPages = this.activedRoute.snapshot.data.lobbies.totalElements;
  }

  public async onPage(page) {
    this.atualPage = page.first;
    const lobbies = await
    this.lobbyService.get(page.first).toPromise();
    for (let i = 0; i < lobbies.contents.length; i++) {
      this.lobbyList[page.first + i] = lobbies.contents[i];
    }
    this.totalPages = lobbies.totalElements;
  }

  public add() {
    this.router.navigate(['dashboard/lobby/new']);
  }

  public async onDelete(id) {
    await this.lobbyService.delete(id).toPromise();
    const indexId = this.lobbyList.findIndex(lobby => lobby.id === id);
    this.lobbyList.splice(indexId, 1);
    this.onPage({
      first: this.atualPage,
      page: 10
    });
  }

}

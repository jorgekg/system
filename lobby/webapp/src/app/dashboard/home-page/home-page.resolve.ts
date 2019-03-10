import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Lobby, LobbyService } from '../../core/entities/lobby/lobby.service';

@Injectable()
export class HomePageResolve implements Resolve<any> {
  constructor(private lobbyService: LobbyService) {}

  async resolve() {
    return await this.homePage();
  }

  private async homePage() {
    return await new Promise(async resolve => {
      try {
        const lobby = await this.lobbyService.get().toPromise();
        resolve({
          lobby: lobby
        });
      } catch (err) {
        resolve([]);
      }
    });
  }
}

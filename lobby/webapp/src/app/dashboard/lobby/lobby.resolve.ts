import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Lobby, LobbyService } from './../../core/entities/lobby/lobby.service';

@Injectable()
export class LobbyResolve implements Resolve<any> {
  constructor(private lobbyService: LobbyService) {}

  async resolve() {
    return await this.getLobby();
  }

  private async getLobby() {
    return await new Promise(async resolve => {
      try {
        resolve(await this.lobbyService.get().toPromise());
      } catch (err) {
        resolve([]);
      }
    });
  }
}

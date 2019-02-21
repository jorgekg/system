import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import { LobbyService } from './../../../core/entities/lobby/lobby.service';

@Injectable()
export class LobbyPersistResolve implements Resolve<any> {
  constructor(
    private lobbyService: LobbyService,
    private router: Router
  ) {}

  async resolve(route: ActivatedRouteSnapshot) {
    return await this.getLobby(route.params);
  }

  private async getLobby(params) {
    return await new Promise(async resolve => {
      try {
        if (params.id === 'new') {
          resolve();
        } else {
          const lobbies = await this.lobbyService.getById(params.id).toPromise();
          if (lobbies && lobbies.length > 0) {
            const [lobby] = lobbies;
            resolve(lobby);
          } else {
            resolve(null);
            this.router.navigate(['error/404']);
          }
        }
      } catch (err) {
        resolve(null);
      }
    });
  }
}

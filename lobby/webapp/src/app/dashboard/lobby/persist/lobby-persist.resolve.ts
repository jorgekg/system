import { LocaleService } from './../../../core/entities/locale/locale.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import { LobbyService } from './../../../core/entities/lobby/lobby.service';

@Injectable()
export class LobbyPersistResolve implements Resolve<any> {
  constructor(
    private lobbyService: LobbyService,
    private localeService: LocaleService,
    private router: Router
  ) {}

  async resolve(route: ActivatedRouteSnapshot) {
    return await this.getLobby(route.params);
  }

  private async getLobby(params) {
    return await new Promise(async resolve => {
      try {
        const states = await this.localeService.getAllStates().toPromise();
        if (params.id === 'new') {
          resolve({
            states: states
          });
        } else {
          const lobbies = await this.lobbyService.getById(params.id).toPromise();
          if (lobbies && lobbies.contents.length > 0) {
            const [lobby] = lobbies.contents;
            resolve({
              lobby: lobby,
              states: states
            });
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

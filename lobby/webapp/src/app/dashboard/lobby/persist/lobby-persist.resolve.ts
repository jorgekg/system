import { LocaleService } from './../../../core/entities/locale/locale.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import { LobbyService } from './../../../core/entities/lobby/lobby.service';
import { AppStorageService } from 'src/app/core/app-storage/app-storage.service';
import { CompanyService } from 'src/app/core/entities/company/company.service';

@Injectable()
export class LobbyPersistResolve implements Resolve<any> {
  constructor(
    private lobbyService: LobbyService,
    private appStorageService: AppStorageService,
    private router: Router,
    private companyService: CompanyService
  ) {}

  async resolve(route: ActivatedRouteSnapshot) {
    return await this.getLobby(route.params);
  }

  private async getLobby(params) {
    return await new Promise(async resolve => {
      try {
        const permission = this.appStorageService.getPermission('lobby');
        if (permission && permission.view_entity) {
          if (params.id === 'new') {
            resolve();
          } else {
            const lobbies = await this.lobbyService.getById(params.id).toPromise();
            if (lobbies && lobbies.contents.length > 0) {
              const [lobby] = lobbies.contents;
              resolve({
                lobby: lobby
              });
            } else {
              resolve(null);
              this.router.navigate(['error/404']);
            }
          }
        } else {
          this.companyService.invalidCredentials();
        }
      } catch (err) {
        resolve(null);
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { Lobby, LobbyService } from './../../core/entities/lobby/lobby.service';
import { AppStorageService } from 'src/app/core/app-storage/app-storage.service';
import { CompanyService } from 'src/app/core/entities/company/company.service';

@Injectable()
export class LobbyResolve implements Resolve<any> {
  constructor(
    private lobbyService: LobbyService,
    private appStorageService: AppStorageService,
    private companyService: CompanyService
  ) {}

  async resolve() {
    return await this.getLobby();
  }

  private async getLobby() {
    return await new Promise(async resolve => {
      try {
        const permission = this.appStorageService.getPermission('lobby');
        if (permission && permission.view_entity) {
          resolve(await this.lobbyService.get().toPromise());
        } else {
          this.companyService.invalidCredentials();
        }
      } catch (err) {
        resolve([]);
      }
    });
  }
}

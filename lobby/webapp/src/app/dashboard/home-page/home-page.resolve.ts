import { AppStorageService } from './../../core/app-storage/app-storage.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Lobby, LobbyService } from '../../core/entities/lobby/lobby.service';
import { ReportService } from 'src/app/core/entities/report/report.service';

@Injectable()
export class HomePageResolve implements Resolve<any> {
  constructor(
    private lobbyService: LobbyService,
    private reportService: ReportService,
    private appStorageService: AppStorageService
  ) {}

  async resolve() {
    return await this.homePage();
  }

  private async homePage() {
    return await new Promise(async resolve => {
      try {
        const lobby = await this.lobbyService.get().toPromise();
        let activeLobby = lobby.contents ? lobby.contents[0] : null;
        if (!this.appStorageService.getactiveLobby()) {
          activeLobby = this.appStorageService.getactiveLobby();
        }
        const cardReport = await this.reportService.getCardReport(activeLobby.id).toPromise();
        resolve({
          lobby: lobby,
          cardReport: cardReport
        });
      } catch (err) {
        resolve([]);
      }
    });
  }
}

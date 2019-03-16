import { AppStorageService } from './../../core/app-storage/app-storage.service';
import { LobbyService } from './../../core/entities/lobby/lobby.service';
import { SchedulingSituation } from 'src/app/core/entities/scheduling/scheduling.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ReceptionService } from 'src/app/core/entities/reception/reception.service';

@Injectable()
export class ReceptionResolve implements Resolve<any> {
  constructor(
    private receptionService: ReceptionService,
    private lobbyService: LobbyService,
    private appStorageService: AppStorageService
  ) {}

  async resolve() {
    return await this.getreception();
  }

  private async getreception() {
    return await new Promise(async resolve => {
      try {
        const lobbeis = await this.lobbyService.get(0, 50).toPromise();
        if (lobbeis && lobbeis.contents.length > 0) {
          const lobby = this.appStorageService.getactiveLobby() ?
          this.appStorageService.getactiveLobby() :
            lobbeis.contents[0];
          const schedulingData = {
            list: await this.receptionService
              .getReception(``, SchedulingSituation.PENDING, lobby.id, new Date(), 0)
              .toPromise()
          };
          resolve(schedulingData);
          this.appStorageService.setLobbies(lobbeis.contents);
          if (!this.appStorageService.getactiveLobby()) {
            this.appStorageService.setactiveLobby(lobby);
          }
        } else {
          resolve({
            list: {
              contents: [],
              totalElements: []
            }
          });
        }
      } catch (err) {
        resolve([]);
      }
    });
  }
}

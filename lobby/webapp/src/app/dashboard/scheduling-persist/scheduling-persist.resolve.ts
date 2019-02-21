import { DocumentTypeService } from './../../core/entities/document-type/document-type.service';
import { LobbyService } from './../../core/entities/lobby/lobby.service';
import { ProceduresService } from 'src/app/core/entities/procedures/procedures.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class SchedulingPersistResolve implements Resolve<any> {
  constructor(
    private proceduresService: ProceduresService,
    private lobbyService: LobbyService,
    private documentTypeService: DocumentTypeService
  ) {}

  async resolve() {
    return await this.getRequirement();
  }

  private async getRequirement() {
    return await new Promise(async resolve => {
      try {
        const procedure = await this.proceduresService.get().toPromise();
        const lobby = await this.lobbyService.get().toPromise();
        const documentType = await this.documentTypeService.get().toPromise();
        const scheduling = {
          procedures: procedure,
          lobbies: lobby,
          documentTypes: documentType
        };
        resolve(scheduling);
      } catch (err) {
        resolve([]);
      }
    });
  }
}

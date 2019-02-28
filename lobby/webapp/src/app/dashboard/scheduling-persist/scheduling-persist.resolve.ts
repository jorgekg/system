import { DocumentTypeService } from './../../core/entities/document-type/document-type.service';
import { LobbyService } from './../../core/entities/lobby/lobby.service';
import { ProceduresService } from 'src/app/core/entities/procedures/procedures.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { SchedulingService } from 'src/app/core/entities/scheduling/scheduling.service';

@Injectable()
export class SchedulingPersistResolve implements Resolve<any> {
  constructor(
    private proceduresService: ProceduresService,
    private lobbyService: LobbyService,
    private documentTypeService: DocumentTypeService,
    private schedulingService: SchedulingService
  ) {}

  async resolve(route: ActivatedRouteSnapshot) {
    return await this.getRequirement(route.params);
  }

  private async getRequirement(params) {
    return await new Promise(async resolve => {
      try {
        const procedure = await this.proceduresService.get().toPromise();
        const lobby = await this.lobbyService.get().toPromise();
        const documentType = await this.documentTypeService.get().toPromise();
        let schedulingData = null;
        if (params.id !== `new`) {
          const schedulings = await this.schedulingService.getSchedulingById(params.id).toPromise();
          if (schedulings && schedulings.length > 0) {
            schedulingData = schedulings[0];
          }
        }
        const scheduling = {
          data: schedulingData,
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

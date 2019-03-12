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
        const procedure = await this.proceduresService.get(0, 999).toPromise();
        const documentType = await this.documentTypeService.get().toPromise();
        let schedulingData = null;
        if (params.id !== `new`) {
          const schedulings = await this.schedulingService.getSchedulingById(params.id).toPromise();
          if (schedulings && schedulings.contents.length > 0) {
            schedulingData = schedulings.contents[0];
          }
        }
        const scheduling = {
          data: schedulingData,
          procedures: procedure.contents,
          documentTypes: documentType.contents
        };
        resolve(scheduling);
      } catch (err) {
        resolve([]);
      }
    });
  }
}

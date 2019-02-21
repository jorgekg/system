import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProceduresService } from 'src/app/core/entities/procedures/procedures.service';


@Injectable()
export class ProceduresResolve implements Resolve<any> {
  constructor(private proceduresService: ProceduresService) {}

  async resolve() {
    return await this.getProcedures();
  }

  private async getProcedures() {
    return await new Promise(async resolve => {
      try {
        resolve(await this.proceduresService.get().toPromise());
      } catch (err) {
        resolve([]);
      }
    });
  }
}

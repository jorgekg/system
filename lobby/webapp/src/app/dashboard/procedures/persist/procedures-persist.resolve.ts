import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ProceduresService } from 'src/app/core/entities/procedures/procedures.service';


@Injectable()
export class ProceduresPersistResolve implements Resolve<any> {
  constructor(
    private proceduresService: ProceduresService,
    private router: Router
  ) {}

  async resolve(route: ActivatedRouteSnapshot) {
    return await this.getProcedures(route.params);
  }

  private async getProcedures(params) {
    return await new Promise(async resolve => {
      try {
        if (params.id === 'new') {
          resolve();
        } else {
          const procedures = await this.proceduresService.getById(params.id).toPromise();
          if (procedures && procedures.length > 0) {
            const [procedure] = procedures;
            resolve(procedure);
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

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ProceduresService } from 'src/app/core/entities/procedures/procedures.service';
import { AppStorageService } from 'src/app/core/app-storage/app-storage.service';
import { CompanyService } from 'src/app/core/entities/company/company.service';


@Injectable()
export class ProceduresPersistResolve implements Resolve<any> {
  constructor(
    private proceduresService: ProceduresService,
    private router: Router,
    private appStorageService: AppStorageService,
    private companyService: CompanyService
  ) {}

  async resolve(route: ActivatedRouteSnapshot) {
    return await this.getProcedures(route.params);
  }

  private async getProcedures(params) {
    return await new Promise(async resolve => {
      try {
        const permission = this.appStorageService.getPermission('procedures');
        if (permission && permission.view_entity) {
          if (params.id === 'new') {
            resolve();
          } else {
            const procedures = await this.proceduresService.getById(params.id).toPromise();
            if (procedures && procedures.contents.length > 0) {
              const [procedure] = procedures.contents;
              resolve(procedure);
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

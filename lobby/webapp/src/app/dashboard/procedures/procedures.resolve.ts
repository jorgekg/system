import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProceduresService } from 'src/app/core/entities/procedures/procedures.service';
import { AppStorageService } from 'src/app/core/app-storage/app-storage.service';
import { CompanyService } from 'src/app/core/entities/company/company.service';


@Injectable()
export class ProceduresResolve implements Resolve<any> {
  constructor(
    private proceduresService: ProceduresService,
    private appStorageService: AppStorageService,
    private companyService: CompanyService
  ) {}

  async resolve() {
    return await this.getProcedures();
  }

  private async getProcedures() {
    return await new Promise(async resolve => {
      try {
        const permission = this.appStorageService.getPermission('procedures');
        if (permission && permission.view_entity) {
          resolve(await this.proceduresService.get().toPromise());
        } else {
          this.companyService.invalidCredentials();
        }
      } catch (err) {
        resolve([]);
      }
    });
  }
}

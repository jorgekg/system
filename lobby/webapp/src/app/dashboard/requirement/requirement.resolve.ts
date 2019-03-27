import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { RequirementService } from 'src/app/core/entities/requirement/requirement.service';
import { AppStorageService } from 'src/app/core/app-storage/app-storage.service';
import { CompanyService } from 'src/app/core/entities/company/company.service';


@Injectable()
export class RequirementResolve implements Resolve<any> {
  constructor(
    private requirementService: RequirementService,
    private appStorageService: AppStorageService,
    private companyService: CompanyService
  ) {}

  async resolve() {
    return await this.getRequirement();
  }

  private async getRequirement() {
    return await new Promise(async resolve => {
      try {
        const permission = this.appStorageService.getPermission('requirement');
        if (permission && permission.view_entity) {
          resolve(await this.requirementService.get().toPromise());
        } else {
          this.companyService.invalidCredentials();
        }
      } catch (err) {
        resolve([]);
      }
    });
  }
}

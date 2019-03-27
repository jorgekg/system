import { RequirementService } from 'src/app/core/entities/requirement/requirement.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppStorageService } from 'src/app/core/app-storage/app-storage.service';
import { CompanyService } from 'src/app/core/entities/company/company.service';


@Injectable()
export class RequirementPersistResolve implements Resolve<any> {
  constructor(
    private requirementService: RequirementService,
    private router: Router,
    private appStorageService: AppStorageService,
    private companyService: CompanyService
  ) {}

  async resolve(route: ActivatedRouteSnapshot) {
    return await this.getRequirement(route.params);
  }

  private async getRequirement(params) {
    return await new Promise(async resolve => {
      try {
        const permission = this.appStorageService.getPermission('requirement');
        if (permission && permission.view_entity) {
          if (params.id === 'new') {
            resolve();
          } else {
            const requirements = await this.requirementService.getById(params.id).toPromise();
            if (requirements && requirements.contents.length > 0) {
              const [requirement] = requirements.contents;
              resolve(requirement);
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

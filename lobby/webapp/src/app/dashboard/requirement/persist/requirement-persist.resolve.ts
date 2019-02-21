import { RequirementService } from 'src/app/core/entities/requirement/requirement.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';


@Injectable()
export class RequirementPersistResolve implements Resolve<any> {
  constructor(
    private requirementService: RequirementService,
    private router: Router
  ) {}

  async resolve(route: ActivatedRouteSnapshot) {
    return await this.getRequirement(route.params);
  }

  private async getRequirement(params) {
    return await new Promise(async resolve => {
      try {
        if (params.id === 'new') {
          resolve();
        } else {
          const requirements = await this.requirementService.getById(params.id).toPromise();
          if (requirements && requirements.length > 0) {
            const [requirement] = requirements;
            resolve(requirement);
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

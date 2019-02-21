import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { RequirementService } from 'src/app/core/entities/requirement/requirement.service';


@Injectable()
export class RequirementResolve implements Resolve<any> {
  constructor(private requirementService: RequirementService) {}

  async resolve() {
    return await this.getRequirement();
  }

  private async getRequirement() {
    return await new Promise(async resolve => {
      try {
        resolve(await this.requirementService.get().toPromise());
      } catch (err) {
        resolve([]);
      }
    });
  }
}

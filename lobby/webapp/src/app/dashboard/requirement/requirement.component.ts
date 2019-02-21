import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { RequirementService } from 'src/app/core/entities/requirement/requirement.service';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent implements OnInit {

  public requirementList = [];

  constructor(
    private router: Router,
    private requirementService: RequirementService,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getRequirement();
  }

  public add() {
    this.router.navigate(['dashboard/requirement/new']);
  }

  private async getRequirement() {
    this.requirementList = this.activedRoute.snapshot.data.requirements;
  }

  public async onDelete(id) {
    await this.requirementService.delete(id).toPromise();
    const indexId = this.requirementList.findIndex(requeriment => requeriment.id === id);
    this.requirementList.splice(indexId, 1);
  }

}

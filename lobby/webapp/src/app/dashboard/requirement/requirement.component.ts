import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { RequirementService } from 'src/app/core/entities/requirement/requirement.service';
import { Permission, AppStorageService } from 'src/app/core/app-storage/app-storage.service';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent implements OnInit {

  public permission: Permission = this.appStorageService.getPermission('requirement');

  public requirementList = [];
  public totalElements = 0;
  private atualPage = 0;

  constructor(
    private router: Router,
    private requirementService: RequirementService,
    private activedRoute: ActivatedRoute,
    private appStorageService: AppStorageService
  ) { }

  ngOnInit() {
    this.getRequirement();
  }

  public async onPage(page) {
    this.atualPage = page.first;
    const requirements = await
    this.requirementService.get(page.first).toPromise();
    for (let i = 0; i < requirements.contents.length; i++) {
      this.requirementList[page.first + i] = requirements.contents[i];
    }
    this.totalElements = requirements.totalElements;
  }

  public add() {
    this.router.navigate(['dashboard/requirement/new']);
  }

  private async getRequirement() {
    this.requirementList = this.activedRoute.snapshot.data.requirements.contents;
    this.totalElements = this.activedRoute.snapshot.data.requirements.totalElements;
  }

  public async onDelete(id) {
    await this.requirementService.delete(id).toPromise();
    const indexId = this.requirementList.findIndex(requeriment => requeriment.id === id);
    this.requirementList.splice(indexId, 1);
    this.onPage({
      first: this.atualPage,
      page: 10
    });
  }

}

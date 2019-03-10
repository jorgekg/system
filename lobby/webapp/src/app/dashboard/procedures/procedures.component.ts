import { AppStorageService } from './../../core/app-storage/app-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ProceduresService } from './../../core/entities/procedures/procedures.service';
import { ProcedureRequirement, ProcedureRequirementService } from 'src/app/core/entities/procedure_requirement/procedure-requirement.service';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit {

  public proceduresList = [];
  public totalElements = 0;

  private atualPage = 0;

  constructor(
    private proceduresService: ProceduresService,
    private proceduresRequirementService: ProcedureRequirementService,
    private route: Router,
    private activedRoute: ActivatedRoute,
    private appStorageService: AppStorageService
  ) { }

  ngOnInit() {
    if (!this.appStorageService.getToken()) {
      this.route.navigate(['dashboard/login']);
    }
    this.getProcedures();
  }

  public async onPage(page) {
    this.atualPage = page.first;
    const proceduresList = await
    this.proceduresService.get(page.first).toPromise();
    for (let i = 0; i < proceduresList.contents.length; i++) {
      this.proceduresList[page.first + i] = proceduresList.contents[i];
    }
    this.totalElements = proceduresList.totalElements;
  }

  private async getProcedures() {
    this.proceduresList = this.activedRoute.snapshot.data.procedures.contents;
    this.totalElements = this.activedRoute.snapshot.data.procedures.totalElements;
  }

  public async onDelete(id) {
    await this.proceduresService.delete(id).toPromise();
    const indexId = this.proceduresList.findIndex(requeriment => requeriment.id === id);
    this.proceduresList.splice(indexId, 1);
  }

  public add() {
    this.route.navigate(['dashboard/procedures/new']);
  }

}

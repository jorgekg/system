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

  constructor(
    private proceduresService: ProceduresService,
    private proceduresRequirementService: ProcedureRequirementService,
    private route: Router,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getProceduress();
  }

  private async getProceduress() {
    this.proceduresList = this.activedRoute.snapshot.data.procedures;
    this.proceduresList.forEach((procedure, index) =>
      this.proceduresRequirementService.getByProcedure(procedure.id)
        .subscribe(requirements =>
          this.proceduresList[index].requirements = requirements.length
        )
    );
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

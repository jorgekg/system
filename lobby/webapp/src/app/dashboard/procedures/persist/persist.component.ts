import {
  ProcedureRequirementService,
  ProcedureRequirement
} from './../../../core/entities/procedure_requirement/procedure-requirement.service';
import { ProceduresService } from './../../../core/entities/procedures/procedures.service';
import { RequirementService } from 'src/app/core/entities/requirement/requirement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStorageService } from './../../../core/app-storage/app-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

const resetSelect2 = () => {
  const windows = window as any;
  windows.jQuery('.select2').val('');
};

@Component({
  selector: 'app-persist',
  templateUrl: './persist.component.html',
  styleUrls: ['./persist.component.css']
})
export class PersistComponent implements OnInit {
  @ViewChild('button') button: ElementRef;

  public form: FormGroup;
  public requirementList = [];
  public procedureRequirementList = [] as ProcedureRequirement[];
  public requirement;
  public isSubmit = false;

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private appStorageService: AppStorageService,
    private proceduresService: ProceduresService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private requirementService: RequirementService,
    private proceduresRequirementService: ProcedureRequirementService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      price: new FormControl('', Validators.compose([Validators.required])),
      time: [],
      detail: []
    });
    this.setEditMode();
    if (!this.isNew()) {
      this.getProcedureRequired();
    }
  }

  private async setEditMode() {
    if (!this.isNew()) {
      const procedure = this.activatedRoute.snapshot.data.procedure;
      this.form.patchValue(procedure);
    }
  }

  public async onSearch(value) {
    this.requirementList = await this.requirementService.getByName(value.query).toPromise();
  }

  public async onSelect(value) {
    const proceduresProcedure = {
      procedure_id: this.activatedRoute.snapshot.params.id,
      requirement_id: value.id,
      company_id: this.appStorageService.getToken().company_id,
      update_at: new Date()
    } as ProcedureRequirement;
    await this.proceduresRequirementService.insert(proceduresProcedure).toPromise();
    this.requirement = null;
    this.getProcedureRequired();
  }

  public async getProcedureRequired() {
    this.procedureRequirementList =
      await this.proceduresRequirementService.getByProcedure(
        this.activatedRoute.snapshot.params.id
      ).toPromise();
  }

  public isNew() {
    return this.activatedRoute.snapshot.params.id === `new`;
  }

  public async onDelete(id) {
    const indexId = this.procedureRequirementList.findIndex(pr => pr.id === id);
    this.procedureRequirementList.splice(indexId, 1);
    await this.proceduresRequirementService.delete(id).toPromise();
  }

  public async save() {
    this.isSubmit = true;
    if (this.form.valid) {
      (this.button.nativeElement as HTMLInputElement).innerHTML =
        this.translateService.instant('await');
      try {
        const procedures = this.form.getRawValue();
        procedures.update_at = new Date();
        procedures.company_id = this.appStorageService.getToken().company_id;
        procedures.time = `${procedures.time}00`;
        if (this.isNew()) {
          const proceduress = await this.proceduresService.insert(procedures).toPromise();
          if (proceduress && proceduress.length > 0) {
            const [proceduresData] = proceduress;
            this.translateService.instant('update');
            this.router.navigate(['dashboard/procedures', proceduresData.id]);
          }
        } else {
          procedures.id = this.activatedRoute.snapshot.params.id;
          await this.proceduresService.update(procedures).toPromise();
          this.router.navigate(['dashboard/procedures']);
        }
      } catch (err) {
        (this.button.nativeElement as HTMLInputElement).innerHTML =
        this.translateService.instant('add');
      }
    }
  }

}

import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AppStorageService } from './../../../core/app-storage/app-storage.service';
import { RequirementService } from 'src/app/core/entities/requirement/requirement.service';

@Component({
  selector: 'app-persist',
  templateUrl: './persist.component.html',
  styleUrls: ['./persist.component.css']
})
export class PersistComponent implements OnInit {
  @ViewChild('button') button: ElementRef;

  public form: FormGroup;
  public isSubmit = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private appStorageService: AppStorageService,
    private router: Router,
    private requirementService: RequirementService,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      price: new FormControl('0,00')
    });
    this.setEditMode();
  }

  private async setEditMode() {
    if (!this.isNew()) {
      const requirement = this.activedRoute.snapshot.data.requirement;
      this.form.patchValue(requirement);
    }
  }

  public isNew() {
    return this.activatedRoute.snapshot.params.id === `new`;
  }

  public async save() {
    this.isSubmit = true;
    if (this.form.valid) {
      (this.button.nativeElement as HTMLInputElement).innerHTML =
        this.translateService.instant('await');
      try {
        const requirement = this.form.getRawValue();
        requirement.update_at = new Date();
        requirement.company_id = this.appStorageService.getToken().company_id;
        if (this.isNew()) {
          await this.requirementService.insert(requirement).toPromise();
        } else {
          requirement.id = this.activatedRoute.snapshot.params.id;
          await this.requirementService.update(requirement).toPromise();
        }
        this.router.navigate(['dashboard/requirement']);
      } catch (err) {}
      (this.button.nativeElement as HTMLInputElement).innerHTML =
        this.translateService.instant('add');
    }
  }
}

import { AppToastService } from './../../../core/app-toast/app-toast.service';
import { AppStorageService } from './../../../core/app-storage/app-storage.service';
import { PersonService } from 'src/app/core/entities/person/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-persist',
  templateUrl: './persist.component.html',
  styleUrls: ['./persist.component.css']
})
export class PersistComponent implements OnInit {

  public form: FormGroup;
  public person;
  public validator = false;

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private personService: PersonService,
    private appStorageService: AppStorageService,
    private appToastService: AppToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required]))
    });
    if (this.activatedRoute.snapshot.data.person) {
      this.person = this.activatedRoute.snapshot.data.person.contents[0];
      this.form.patchValue(this.person);
    }
  }

  public isNew() {
    return this.activatedRoute.snapshot.params.id === `new`;
  }

  public async save() {
    this.validator = true;
    if (this.form.valid) {
      const form = this.form.getRawValue();
      form.company_id = this.appStorageService.getToken().company_id;
      form.active = 'S';
      if (this.isNew()) {
        await this.personService.insert(form).toPromise();
        this.appToastService.success('success', 'person.insert.success');
      } else {
        form.id = this.person.id;
        await this.personService.update(form).toPromise();
        this.appToastService.success('success', 'person.update.success');
      }
      this.router.navigate(['dashboard/person']);
    }
  }

}
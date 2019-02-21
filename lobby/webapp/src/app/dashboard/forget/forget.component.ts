import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { PersonService } from './../../core/entities/person/person.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  @ViewChild('button') button:ElementRef;

  public form: FormGroup;
  public isSubmit = false;

  constructor(
    private personService: PersonService,
    private formBUilder: FormBuilder,
    private translateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBUilder.group({
      email: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  public async forget() {
    (this.button.nativeElement as HTMLInputElement).innerHTML =
      this.translateService.instant('await');
    const form = this.form.getRawValue();
    this.isSubmit = true;
    if (form.email) {
      try {
        await this.personService.forget({email: form.email}).toPromise();
        this.router.navigate(['person/forget/success']);
      } catch (err) {
        (this.button.nativeElement as HTMLInputElement).innerHTML =
          this.translateService.instant('person.forget.btn');
      }
    }
  }

}

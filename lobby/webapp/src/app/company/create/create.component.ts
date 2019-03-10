import { Router } from '@angular/router';
import { AppStorageService } from './../../core/app-storage/app-storage.service';
import { CompanyService } from './../../core/entities/company/company.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TokenService } from 'src/app/core/entities/token/token.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('button') button: ElementRef;
  public validator = false;

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private tokenService: TokenService,
    private translateService: TranslateService,
    private appStorageService: AppStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  public async save() {
    if (this.form.valid) {
      try {
        const form = this.form.getRawValue();
        (this.button.nativeElement as HTMLInputElement).innerHTML =
          this.translateService.instant('await');
        await this.companyService.insert(form).toPromise();
        const token = await this.createToken(form);
        this.appStorageService.setToken(token);
        this.goToDashboard();
        (this.button.nativeElement as HTMLInputElement).innerHTML =
        this.translateService.instant('company.submit.btn');
      } catch (err) {
        (this.button.nativeElement as HTMLInputElement).innerHTML =
        this.translateService.instant('company.submit.btn');
      }
    } else {
      this.validator = true;
    }
  }

  private goToDashboard() {
    this.router.navigate(['dashboard']);
  }

  private async createToken(form) {
    const tokens =
      await this.tokenService.createToken(form).toPromise();
    if (tokens && tokens.contents.length > 0) {
      const [token] = tokens.contents;
      return token;
    }
    throw {code: 500};
  }

}

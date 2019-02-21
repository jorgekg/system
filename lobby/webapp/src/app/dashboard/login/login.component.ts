import { AppStorageService } from './../../core/app-storage/app-storage.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { TokenService } from 'src/app/core/entities/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('button') button: ElementRef;

  public form: FormGroup;
  public isSubmit = false;

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private tokenService: TokenService,
    private appStorageService: AppStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      remember: new FormControl(false)
    });
    if (this.appStorageService.getToken()) {
      this.goToDashboard();
    }
  }

  private goToDashboard() {
    this.router.navigate(['dashboard']);
  }

  public async save() {
    this.isSubmit = true;
    if (this.form.valid) {
      (this.button.nativeElement as HTMLInputElement).innerHTML =
        this.translateService.instant('await');
      try {
        const token = await this.createToken();
        this.appStorageService.setToken(token);
        this.setRemeber(this.form.get('remember').value);
        this.goToDashboard();
      } catch (err) {}
      (this.button.nativeElement as HTMLInputElement).innerHTML =
        this.translateService.instant('company.create.btn');
    }
  }

  private setRemeber(remeber) {
    this.appStorageService.setRemeber(remeber ? remeber : false);
  }

  private async createToken() {
    const tokens =
      await this.tokenService.createToken(this.form.getRawValue()).toPromise();
    if (tokens && tokens.length > 0) {
      const [token] = tokens;
      return token;
    }
    throw {code: 500};
  }

}

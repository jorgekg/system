import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import { AppStorageService } from '../../app-storage/app-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private appStorageService: AppStorageService
  ) { }

  public insert(company) {
    return this.http.post(`${environment.url}/company`, company);
  }

  public getCompanyByUser() {
    return this.http.get<any>(`${environment.url}/company_by_user`, {
      params: {
        person_id: this.appStorageService.getToken().company_user_id.toString(),
      }
    });
  }

  public invalidCredentials() {
    localStorage.clear();
    this.router.navigate(['dashboard/login']);
  }
}

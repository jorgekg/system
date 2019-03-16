import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }

  public insert(company) {
    return this.http.post(`${environment.url}/company`, company);
  }

  public insertCompanyUser(companyUser) {
    return this.http.post(`${environment.url}/company_user`, companyUser);
  }

  public getUserPermission(personId) {
    return this.http.get(`${environment.url}/company_by_user`, {
      params: {
        person_id: personId
      }
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private endpoint = `${environment.url}/token`;

  constructor(private http: HttpClient) { }

  public createToken(company) {
    return this.http.post<Token[]>(this.endpoint, company);
  }
}

export interface Token {
  id: number;
  token: string;
  company_id: number;
  expired: Date;
  active: string;
}

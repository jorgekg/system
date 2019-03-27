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
    return this.http.post<Tokens>(this.endpoint, company);
  }
}

export interface Tokens {
  contents: Token[];
}

export interface Token {
  id: number;
  token: string;
  company_user_id: number;
  company_id: number;
  expired: Date;
  active: string;
}

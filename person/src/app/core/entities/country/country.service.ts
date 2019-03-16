import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private endpoint = `${environment.url}/countries`;

  constructor(
    private http: HttpClient
  ) { }

  public get() {
    return this.http.get<Country[]>(this.endpoint);
  }
}

export interface Country {
  id: number;
  name?: string;
  active?: string;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../../environments/environment';
import { Country } from './../country/country.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private endpoint = `${environment.url}/states`

  constructor(
    private http: HttpClient
  ) { }

  public getStateByCountry(countryId) {
    return this.http.get<State[]>(`${this.endpoint}/?country_id=${countryId}`);
  }
}

export interface State {
  id: number;
  country_id: number;
  country?: Country[];
  name: string;
  active: string;
}

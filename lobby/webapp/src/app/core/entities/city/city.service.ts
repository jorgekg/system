import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { State } from './../state/state.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private endpoint = `${environment.url}/cities`;

  constructor(
    private http: HttpClient
  ) { }

  public getCityByState(id) {
    return this.http.get<City[]>(`${this.endpoint}/?state_id=${id}`);
  }
}

export interface City {
  id: number;
  name: string;
  state_id: number;
  state?: State[];
  cep: number;
  latitude: string;
  longitude: string;
  active: string;
}

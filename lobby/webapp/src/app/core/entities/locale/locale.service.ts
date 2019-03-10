import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllStates() {
    return this.http.get(`${environment.url}/states`, {
      params: {
        size: `27`
      }
    });
  }

  public getCityByState(uf: string) {
    return this.http.get<Cities>(`${environment.url}/city`, {
      params: {
        uf: uf,
        size: `999`
      }
    });
  }
}

export interface States {
  id: number;
  name: string;
  uf: string;
}

export interface Cities {
  contents: City[];
  totalElements: number;
}

export interface City {
  id: number;
  name: string;
  uf: string
}

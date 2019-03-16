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

  public getStates(id: number) {
    return this.http.get<States>(`${environment.url}/states`, {
      params: {
        id: id.toString(),
        size: `27`
      }
    });
  }

  public getStateByName(name: string) {
    return this.http.get<States>(`${environment.url}/states_name`, {
      params: {
        name: name
      }
    });
  }

  public getCityByState(uf: string, city: number) {
    return this.http.get<Cities>(`${environment.url}/city`, {
      params: {
        uf: uf,
        id: city.toString(),
        size: `999`
      }
    });
  }
  
  public getCityByName(name: string, uf: string) {
    return this.http.get<Cities>(`${environment.url}/city_name`, {
      params: {
        name: name,
        uf: uf
      }
    });
  }
}

export interface States {
  contents: State[];
}

export interface State {
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

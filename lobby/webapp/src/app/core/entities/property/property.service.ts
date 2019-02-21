import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private endpoint = `${environment.url}/properties`;

  constructor(private http: HttpClient) {}

  public getPersonProperties(personId: number) {
    return this.http.get<Property[]>(`${this.endpoint}/?person_id=${personId}`);
  }

  public create(property: Property) {
    return this.http.post<Property[]>(this.endpoint, property);
  }
}

export interface Property {
  id: number;
  person_id: number;
  fantasy_name: string;
  social_name: string;
  document: string;
  active: string;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyContactService {

  private endpoint = `${environment.url}/property_contact`;

  constructor(
    private http: HttpClient
  ) { }

  public getByProperty(propertyId) {
    return this.http.get<Contact[]>(`${this.endpoint}/?property_id=${propertyId}`);
  }

  public insert(contact: Contact) {
    return this.http.post<Contact[]>(this.endpoint, contact);
  }
}

export interface Contact {
  id?: number;
  property_id: number;
  type: ContactEnum;
  description: string;
  preferential?: number;
}

export enum ContactEnum {
  NUMBER = 1,
  WHATSAPP = 2,
  EMAIL = 3
}

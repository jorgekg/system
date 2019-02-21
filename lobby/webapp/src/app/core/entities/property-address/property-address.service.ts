import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyAddressService {

  private endpoint = `${environment.url}/property_address`;

  constructor(
    private http: HttpClient
  ) { }

  public getAddressByProperty(propertyId) {
    return this.http.get<PropertyAddress[]>(`${this.endpoint}/?property_id=${propertyId}`);
  }

  public insert(propertyAddress) {
    return this.http.post<PropertyAddress[]>(this.endpoint, propertyAddress);
  }
}

export interface PropertyAddress {
  id: number;
  property_id: number;
  country_id: number;
  state_id: number;
  city_id: number;
  neighborhood: string;
  street: string;
  number: number;
  description: string;
}

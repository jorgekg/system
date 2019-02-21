import { Injectable } from '@angular/core';

import { Token } from './../entities/token/token.service';
import { Property } from '../entities/property/property.service';
@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  private key = 'com.br.storage.lobby';

  private storageKey = {
    token: `${this.key}.token`,
    remeber: `${this.key}.remeber`,
    properties: `${this.key}.properties`,
    activeProperties: `${this.key}.activeProperties`
  };

  constructor() { }

  public setActiveProperty(property: Property) {
    this.setStorage(this.storageKey.activeProperties, property);
  }

  public getActiveProperty(): Property {
    const property = localStorage.getItem(this.storageKey.activeProperties);
    if (property) {
      return JSON.parse(property);
    }
    return null;
  }

  public setRemeber(isRemeber: boolean) {
    this.setStorage(this.storageKey.remeber, isRemeber);
  }

  public getRemeber(): boolean {
    const remeber = localStorage.getItem(this.storageKey.remeber);
    if (remeber) {
      return JSON.parse(remeber);
    }
    return false;
  }

  public setProperties(properties: Property[]) {
    this.setStorage(this.storageKey.properties, properties);
  }

  public getProperties(): Property[] {
    const properties = localStorage.getItem(this.storageKey.properties);
    if (properties) {
      return JSON.parse(properties);
    } else {
      return null;
    }
  }

  public setToken(token: Token) {
    this.setStorage(this.storageKey.token, token);
  }

  public getToken(): Token {
    const token = localStorage.getItem(this.storageKey.token);
    if (token) {
      return JSON.parse(token);
    }
    return null;
  }

  private setStorage(key, param) {
    localStorage.setItem(key, JSON.stringify(param));
  }
}

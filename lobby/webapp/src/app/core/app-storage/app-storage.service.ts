import { Injectable } from '@angular/core';

import { Token } from './../entities/token/token.service';
import { Property } from '../entities/property/property.service';
import { Lobby } from '../entities/lobby/lobby.service';
import { Scheduling } from '../entities/scheduling/scheduling.service';
@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  private key = 'com.br.storage.lobby';

  private storageKey = {
    token: `${this.key}.token`,
    remeber: `${this.key}.remeber`,
    properties: `${this.key}.properties`,
    activeProperties: `${this.key}.activeProperties`,
    lobbies: `${this.key}.lobbies`,
    activeLobby: `${this.key}.activeLobby`,
    tutorial: `${this.key}.tutorial`,
    scheduling: `${this.key}.scheduling`,
    permission: `${this.key}.permission`
  };

  constructor() { }

  public setPermissions(permissions) {
    localStorage.setItem(this.storageKey.permission, JSON.stringify(permissions));
  }

  public hasPermission() {
    return localStorage.getItem(this.storageKey.permission);
  }

  public getPermission(entity): Permission {
    const permissions = localStorage.getItem(this.storageKey.permission);
    if (permissions) {
      const permissionsObject = JSON.parse(permissions);
      const object = permissionsObject
        .find(permissionObject => permissionObject.entity === entity) as Permission;
      if (object) {
        object.view_entity = this.isPermissionValid(object.view_entity);
        object.delete_entity = this.isPermissionValid(object.delete_entity);
        object.insert_entity = this.isPermissionValid(object.insert_entity);
        object.updat_entity = this.isPermissionValid(object.updat_entity);
      }
      return object;
    }
    return null;
  }

  private isPermissionValid(value) {
    return !!parseInt(value, 0);
  }

  public setScheduling(scheduling: Scheduling) {
    const schedulings = this.getSchedulings();
    schedulings.push(scheduling);
    localStorage.setItem(this.storageKey.scheduling, JSON.stringify(schedulings));
  }

  public setSchedulings(schedulings: Scheduling[]) {
    localStorage.setItem(this.storageKey.scheduling, JSON.stringify(schedulings));
  }

  public getSchedulings(): Scheduling[] {
    const scheduling = localStorage.getItem(this.storageKey.scheduling);
    if (scheduling) {
      return JSON.parse(scheduling);
    }
    return [];
  }

  public setTutorial(key: string, value: boolean) {
    let tutorial = this.getTutorial() as any;
    if (!tutorial) {
      tutorial = {};
    }
    tutorial[key] = value;
    this.setStorage(this.storageKey.tutorial, tutorial);
  }

  public getTutorial(): Tutorial {
    const tutorial = localStorage.getItem(this.storageKey.tutorial);
    if (tutorial) {
      return JSON.parse(tutorial);
    }
    return null;
  }

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

  public setLobbies(lobbies: Lobby[]) {
    this.setStorage(this.storageKey.lobbies, lobbies);
  }

  public getLobbies(): Lobby[] {
    const Lobbies = localStorage.getItem(this.storageKey.lobbies);
    if (Lobbies) {
      return JSON.parse(Lobbies);
    }
    return [];
  }

  public setactiveLobby(activeLobby: Lobby) {
    this.setStorage(this.storageKey.activeLobby, activeLobby);
  }

  public getactiveLobby(): Lobby {
    const activeLobby = localStorage.getItem(this.storageKey.activeLobby);
    if (activeLobby) {
      return JSON.parse(activeLobby);
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

export interface Tutorial {
  lobby_new: boolean;
  procedures: boolean;
}

export interface Permission {
  view_entity: boolean;
  updat_entity: boolean;
  insert_entity: boolean;
  delete_entity: boolean;
}

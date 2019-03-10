import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  private endpont = `${environment.url}/lobby`;

  constructor(public http: HttpClient) {}

  public get(page = 0, size = 10) {
    return this.http.get<Lobbies>(this.endpont, {
      params: {
        offset: page.toString(),
        size: size.toString()
      }
    });
  }

  public getById(id: number) {
    return this.http.get<Lobbies>(this.endpont, {
      params: { id: id.toString() }
    });
  }

  public insert(lobby: Lobby) {
    return this.http.post<Lobby[]>(this.endpont, lobby);
  }

  public update(lobby: Lobby) {
    return this.http.post<Lobby[]>(`${environment.url}/put/lobby`, lobby);
  }

  public delete(id: number) {
    return this.http.get<Lobby>(`${environment.url}/delete/lobby`, {
      params: {
        id: id.toString()
      }
    });
  }
}

export interface Lobbies {
  contents: Lobby[];
  totalElements: number;
}

export interface Lobby {
  id: number;
  company_id?: number;
  name: string;
  state_id: number;
  city_id: number;
  district: string;
  street: string;
  number: string;
  company_user?: number;
  create_at?: Date;
  update_at?: Date;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  private endpont = `${environment.url}/lobby`;

  constructor(public http: HttpClient) {}

  public get() {
    return this.http.get<Lobby[]>(this.endpont);
  }

  public getById(id: number) {
    return this.http.get<Lobby[]>(this.endpont, {
      params: { id: id.toString() }
    });
  }

  public insert(lobby: Lobby) {
    return this.http.post<Lobby[]>(this.endpont, lobby);
  }

  public update(lobby: Lobby) {
    return this.http.put<Lobby[]>(this.endpont, lobby);
  }

  public delete(id: number) {
    return this.http.delete<Lobby>(this.endpont, {
      params: {
        id: id.toString()
      }
    });
  }
}

export interface Lobby {
  id: number;
  company_id: number;
  name: string;
  start_date: string;
  end_date: string;
  company_user: number;
  create_at: Date;
  update_at: Date;
}

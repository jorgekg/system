import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {

  private endpont = `${environment.url}/procedures`;

  constructor(
    private http: HttpClient
  ) { }

  public get() {
    return this.http.get<Procedures[]>(this.endpont);
  }

  public getById(id: number) {
    return this.http.get<Procedures[]>(this.endpont, {
      params: {
        id: id.toString()
      }
    });
  }

  public insert(procedures) {
    return this.http.post<Procedures[]>(this.endpont, procedures);
  }

  public update(procedures) {
    return this.http.put<Procedures[]>(this.endpont, procedures);
  }

  public delete(id: number) {
    return this.http.delete<Procedures>(this.endpont, {
      params: {
        id: id.toString()
      }
    });
  }
}

export interface Procedures {
  id: number;
  company_id: number;
  name: string;
  price: number;
  detail: string;
  active: string;
  update_at: Date;
}

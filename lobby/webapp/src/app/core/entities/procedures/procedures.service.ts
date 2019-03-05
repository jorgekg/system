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

  public get(page = 0, size = 0) {
    return this.http.get<ProceduresList>(this.endpont, {
      params: {
        offset: page.toString(),
        size: size.toString()
      }
    });
  }

  public getById(id: number) {
    return this.http.get<ProceduresList>(this.endpont, {
      params: {
        id: id.toString()
      }
    });
  }

  public insert(procedures) {
    return this.http.post<ProceduresList>(this.endpont, procedures);
  }

  public update(procedures) {
    return this.http.post<Procedures[]>(`${environment.url}/put/procedures`, procedures);
  }

  public delete(id: number) {
    return this.http.get<Procedures>(`${environment.url}/delete/procedures`, {
      params: {
        id: id.toString()
      }
    });
  }
}

export interface ProceduresList {
  contents: Procedures[];
  totalElements: number;
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

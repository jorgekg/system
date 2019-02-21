import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {

  private endpoint = `${environment.url}/requirement`;

  constructor(
    private http: HttpClient
  ) { }

  public get() {
    return this.http.get<Requirement[]>(this.endpoint);
  }

  public getById(id: number) {
    return this.http.get<Requirement[]>(this.endpoint, {
      params: {
        id: id.toString()
      }
    });
  }

  public getByName(name: string) {
    return this.http.get<Requirement[]>(`${this.endpoint}_name`, {
      params: {
        name: name
      }
    });
  }

  public insert(requirement) {
    return this.http.post<Requirement[]>(this.endpoint, requirement);
  }

  public update(requirement) {
    return this.http.put<Requirement[]>(this.endpoint, requirement);
  }

  public delete(id: number) {
    return this.http.delete<Requirement>(this.endpoint, {
      params: {
        id: id.toString()
      }
    });
  }
}

export interface Requirement {
  id: number;
  company_id: number;
  name: string;
  price: string;
  has_cost: string;
  active: string;
  update_at: Date;
}

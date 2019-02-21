import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private endpoint = `${environment.url}/people`;

  constructor(
    private http: HttpClient
  ) { }

  public get(personId: number) {
    return this.http.get<Person[]>(`${this.endpoint}/?id=${personId}`);
  }

  public insert(person) {
    return this.http.post<Person[]>(this.endpoint, person);
  }

  public update(person) {
    return this.http.put(this.endpoint, person);
  }

  public forget(email) {
    return this.http.post(`${this.endpoint}/forget`, email);
  }
}

export interface Person {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  active?: string;
  root?: string;
  property?: string;
}

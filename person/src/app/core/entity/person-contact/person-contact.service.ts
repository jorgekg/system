import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonContactService {

  constructor(
    private http: HttpClient
  ) { }

  public get(personId: number, type: number) {
    return this.http.get(`${environment.url}/person_contact`, {
      params: {
        person_id: personId.toString(),
        contact_type_id: type.toString()
      }
    });
  }

  public insert(document) {
    return this.http.post(`${environment.url}/person_contact`, document);
  }

  public delete(id: number, personId: number) {
    return this.http.get(`${environment.url}/delete/person_contact`, {
      params: {
        id: id.toString(),
        person_id: personId.toString()
      }
    });
  }
}

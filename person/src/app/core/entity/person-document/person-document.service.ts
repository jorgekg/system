import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonDocumentService {

  constructor(
    private http: HttpClient
  ) { }

  public get(personId: number) {
    return this.http.get(`${environment.url}/person_document`, {
      params: {
        person_id: personId.toString()
      }
    });
  }

  public insert(document) {
    return this.http.post(`${environment.url}/person_document`, document);
  }

  public delete(id: number, personId: number) {
    return this.http.get(`${environment.url}/delete/person_document`, {
      params: {
        id: id.toString(),
        person_id: personId.toString()
      }
    });
  }
}

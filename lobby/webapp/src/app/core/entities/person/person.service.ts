import { ContactTypeEnum } from './../../../shared/enum/contact-type.enum';
import { DocumentTypeEnum } from './../../../shared/enum/document-type.enum';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private endpoint = `${environment.url}/person`;

  constructor(
    private http: HttpClient
  ) { }

  public get(personId: number) {
    return this.http.get<Person[]>(`${this.endpoint}/?id=${personId}`);
  }

  public getAll(personId: number) {
    return this.http.get<Person[]>(`${this.endpoint}/all?id=${personId}`);
  }

  public getByName(name: string, responsible: string, companyId?: number) {
    return this.http.get<Person[]>(
      `${this.endpoint}/byname?name=${name}&responsible=${responsible}${
        companyId ? `&company_id=${companyId}` : `` }`
    );
  }

  public createPerson(person) {
    return this.http.post<Person[]>(`${environment.url}/create_person`, person);
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
  company_id?: number;
  responsible?: string;
  active?: string;
  documents?: PersonDocument[];
  emails?: PersonContact[];
  phones?: PersonContact[];
  update_at?: Date;
}

export interface PersonDocument {
  id?: number;
  person_id?: number;
  document_type_id?: DocumentTypeEnum;
  document?: string;
  update_at?: Date;
}

export interface PersonContact {
  id?: number;
  contact_type_id?: number;
  contact?: string;
  update_at?: Date;
}

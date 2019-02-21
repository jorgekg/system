import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  private endpoint = `${environment.url}/document_type`

  constructor(
    private http: HttpClient
  ) { }

  public get() {
    return this.http.get<DocumentType[]>(this.endpoint);
  }
}

export interface DocumentType {
  id: number;
  type: string;
  label: string;
  mask: string;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppStorageService } from './../../app-storage/app-storage.service';
import { environment } from 'src/environments/environment';
import { Scheduling } from '../scheduling/scheduling.service';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {

  constructor(
    private http: HttpClient,
    private appStorageSerice: AppStorageService
  ) { }

  public getReception(personName, schedulingSituation, page = 0) {
    return this.http.get<Scheduling[]>(`${environment.url}/reception`, {
      params: {
        name: personName,
        situation: schedulingSituation,
        page: page.toString(),
        company_id: this.appStorageSerice.getToken().company_id.toString()
      }
    });
  }

  public updateReception(reception: Scheduling) {
    return this.http.put<Scheduling[]>(`${environment.url}/scheduling`, reception);
  }

  public unFinish(reception: Scheduling) {
    return this.http.put<Scheduling[]>(`${environment.url}/unFinish`, reception);
  }
}

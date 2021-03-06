import { Schedulings } from './../scheduling/scheduling.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppStorageService } from './../../app-storage/app-storage.service';
import { environment } from 'src/environments/environment';
import { Scheduling } from '../scheduling/scheduling.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {

  constructor(
    private http: HttpClient,
    private appStorageSerice: AppStorageService
  ) { }

  public getReception(personName, schedulingSituation, lobby_id, receptionDate = new Date(), page = 0) {
    return this.http.get<Schedulings>(`${environment.url}/reception`, {
      params: {
        name: personName,
        situation: schedulingSituation,
        lobby_id: lobby_id,
        date: moment(receptionDate).format('YYYY-MM-DD'),
        offset: page.toString(),
        company_id: this.appStorageSerice.getToken().company_id.toString()
      }
    });
  }

  public updateReception(reception: Scheduling) {
    return this.http.post<Schedulings>(`${environment.url}/put/scheduling`, reception);
  }

  public unFinish(reception: Scheduling) {
    return this.http.post<Schedulings>(`${environment.url}/put/unFinish`, reception);
  }
}

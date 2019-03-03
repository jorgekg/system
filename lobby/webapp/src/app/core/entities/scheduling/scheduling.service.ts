import { AppStorageService } from './../../app-storage/app-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  constructor(
    private http: HttpClient,
    private appStorageSerice: AppStorageService
  ) { }

  public getScheduling(personName, schedulingSituation, page = 0) {
    return this.http.get<Scheduling[]>(`${environment.url}/schedulings`, {
      params: {
        name: personName,
        situation: schedulingSituation,
        page: page.toString(),
        company_id: this.appStorageSerice.getToken().company_id.toString()
      }
    });
  }

  public getSchedulingById(schedulingId: number) {
    return this.http.get<Scheduling[]>(`${environment.url}/schedulingid`, {
      params: {
        id: schedulingId.toString(),
        company_id: this.appStorageSerice.getToken().company_id.toString()
      }
    });
  }

  public create(scheduling: Scheduling) {
    return this.http.post<Scheduling[]>(`${environment.url}/create_scheduling`, scheduling);
  }

}

export enum SchedulingSituation {
  PENDING = 1
}

export interface Scheduling {
  id: number;
  company_id: number;
  name: string;
  lobby_id: number;
  start_date: Date;
  end_date: Date;
  active: string;
  schedulingProcedures: SchedulingProcedures[];
  schedulingResponsibles: SchedulingResponsible[];
  schedulingVisitors: SchedulingVisitor[];
}

export interface SchedulingProcedures {
  id: number;
  company_id: number;
  scheduling_id: number;
  procedure_id: number;
}

export interface SchedulingResponsible {
  id: number;
  company_id: number;
  scheduling_id: number;
  person_id: number;
  active: string;
}

export interface SchedulingVisitor {
  id: number;
  company_id: number;
  scheduling_id: number;
  person_id: number;
  active: string;
}

import { AppStorageService } from './../../app-storage/app-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { AppRequestService } from '../../app-request/app-request.service';
import { AppToastService } from '../../app-toast/app-toast.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  constructor(
    private http: HttpClient,
    private appStorageSerice: AppStorageService,
    private appRequestService: AppRequestService,
    private appToastService: AppToastService
  ) { }

  public getScheduling(personName, schedulingSituation, page = 0) {
    return this.http.get<Schedulings>(`${environment.url}/schedulings`, {
      params: {
        name: personName,
        situation: schedulingSituation,
        offset: page.toString(),
        company_id: this.appStorageSerice.getToken().company_id.toString()
      }
    });
  }

  public async addOnSubscribe(scheduling) {
    this.appRequestService.setIgnoreLoader();
    scheduling.company_id = this.appStorageSerice.getToken().company_id;
    scheduling.start_date = moment(scheduling.start_date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
    scheduling.end_date = moment(scheduling.end_date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
    scheduling.active = scheduling.active || `S`;
    scheduling.procedures.forEach(proc => {
      proc.id = proc.procedure_id;
    });
    const schedulings = await this.clone(scheduling).toPromise();
    const schedulignStorage = this.appStorageSerice.getSchedulings()
      .filter(sched => sched.id !== scheduling.id);
    schedulignStorage.push(schedulings.contents[0]);
    this.appStorageSerice.setSchedulings(schedulignStorage);
    this.appRequestService.setUnIgnoredLoader();
    return schedulings.contents[0];
  }

  public updateScheduling(scheduling: Scheduling) {
    return this.http.post(`${environment.url}/put/scheduling`, scheduling);
  }

  public getSchedulingById(schedulingId: number) {
    return this.http.get<Schedulings>(`${environment.url}/schedulingid`, {
      params: {
        id: schedulingId.toString(),
        company_id: this.appStorageSerice.getToken().company_id.toString()
      }
    });
  }

  public create(scheduling: Scheduling) {
    return this.http.post<Schedulings>(`${environment.url}/create_scheduling`, scheduling);
  }

  public clone(scheduling: Scheduling) {
    return this.http.post<Schedulings>(`${environment.url}/clone_scheduling`, scheduling);
  }

  public getRatingyLink(link: string) {
    return this.http.get<Ratings>(`${environment.url}/scheduling/rating`, {
      params: {
        link: link
      }
    });
  }

  public putRating(rating: Rating) {
    return this.http.post<Ratings>(`${environment.url}/scheduling/rating`, rating);
  }

  public getRatingSum(lobbyId: number) {
    return this.http.get<Ratings>(`${environment.url}/rating/sum`, {
      params: {
        lobby_id: lobbyId.toString()
      }
    });
  }

}

export interface Ratings {
  contents: Rating[];
  totalElements: number;
}

export interface Rating {
  id?: number;
  company_id?: string;
  scheduling_id?: string;
  visitor_id?: string;
  link?: string;
  rating?: number;
  description?: string;
}

export enum SchedulingSituation {
  PENDING = '1',
  FINISH = '2',
  CANCELED = '3',
  IN_PROGRESS = '4'
}

export interface Schedulings {
  contents: Scheduling[];
  totalElements: number;
}

export interface Scheduling {
  id?: number;
  abs_id?: string;
  company_id?: number;
  name?: string;
  lobby_id?: number;
  start_date?: Date;
  end_date?: Date;
  situation?: SchedulingSituation;
  active?: string;
  procedures?: SchedulingProcedures[];
  responsibles?: SchedulingResponsible[];
  visitors?: SchedulingVisitor[];
  schedulingProcedures?: SchedulingProcedures[];
  schedulingResponsibles?: SchedulingResponsible[];
  schedulingVisitors?: SchedulingVisitor[];
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

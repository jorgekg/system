import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  constructor(
    private http: HttpClient
  ) { }

  public create(checkin: Checkin) {
    return this.http.post<Checkin[]>(`${environment.url}/checkin`, checkin);
  }

  public unCreate(checkin: Checkin) {
    return this.http.put<Checkin[]>(`${environment.url}/checkin`, checkin);
  }
}

export interface Checkin {
  id?: number;
  company_id: number;
  visitor_id?: number;
  checkin_date?: Date;
  active?: string;
}

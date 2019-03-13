import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient
  ) { }

  public getCardReport(lobby_id) {
    return this.http.get<CardReports>(`${environment.url}/card_report`, {
      params: {
        lobby_id: lobby_id
      }
    });
  }
}

export interface CardReports {
  contents: CardReport[];
}

export interface CardReport {
  id?: number;
  company_id?: number;
  lobby_id?: number;
  year?: number;
  month?: number;
  week?: number;
  update_at?: Date;
  type: number;
  today: number;
}

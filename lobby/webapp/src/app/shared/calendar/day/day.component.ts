import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  public lines: Lines[];
  public selectedDay: {};
  public events: [];

  constructor() { }

  ngOnInit() {
    this.getQtdCelulas();
  }

  private getQtdCelulas() {
    this.lines = [];
    const lines = 25;
    const hour = 30;
    for (let i = 0; i < lines; i++) {
      if (i === 24) {
        this.lines.push({
          hour: this.getHours(0, 0),
          datetime: (moment()).hour(0).minute(0).second(0).toDate()
        });
        continue;
      } else {
        this.lines.push({
          hour: this.getHours(i, 0),
          datetime: (moment()).hour(i).minute(0).second(0).toDate()
        });
      }
      let b = hour;
      while (b < 60) {
        this.lines.push({
          hour: this.getHours(i, b),
          datetime: (moment()).hour(i).minute(b).second(0).toDate()
        });
        b += hour;
      }
    }
  }

  public getHours(hour: number, minute: number) {
    return (
      (hour > 9 ? (hour) : `0${(hour)}`).toString()
      + ':' +
      (minute > 9 ? (minute) : `0${minute}`).toString()
    );
  }

  public selectRow(line: Lines) {
    this.selectedDay = line;
  }

}

export interface Lines {
  hour: string;
  datetime: Date;
}

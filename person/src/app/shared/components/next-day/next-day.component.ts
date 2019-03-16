import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-next-day',
  templateUrl: './next-day.component.html',
  styleUrls: ['./next-day.component.css']
})
export class NextDayComponent implements OnInit {

  @Output() date = new EventEmitter();

  public moment = moment();

  constructor() { }

  ngOnInit() {
  }

  public reset() {
    this.moment = moment();
  }

  public add() {
    this.moment.add(1, 'days');
    this.date.emit(this.moment.toDate());
  }

  public down() {
    this.moment.subtract(1, 'days');
    this.date.emit(this.moment.toDate());
  }

}

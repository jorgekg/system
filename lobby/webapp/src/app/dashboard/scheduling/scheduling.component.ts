import { SchedulingService, Scheduling, SchedulingSituation } from './../../core/entities/scheduling/scheduling.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {

  public schedulingList = [] as Scheduling[];

  constructor(
    private schedulingService: SchedulingService
  ) { }

  ngOnInit() {
    this.getSchedulings();
  }

  public async getSchedulings() {
    this.schedulingList = await this.schedulingService.getScheduling(
      ``, SchedulingSituation.PENDING, 0
    ).toPromise();
  }

}

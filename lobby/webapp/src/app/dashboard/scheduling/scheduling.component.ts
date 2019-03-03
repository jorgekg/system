import { SchedulingService, Scheduling, SchedulingSituation } from './../../core/entities/scheduling/scheduling.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {

  public schedulingList = [] as Scheduling[];
  public situation = SchedulingSituation.PENDING;

  constructor(
    private schedulingService: SchedulingService
  ) { }

  ngOnInit() {
    this.getSchedulings();
  }

  public async getSchedulings() {
    this.schedulingList = await this.schedulingService.getScheduling(
      ``, this.situation, 0
    ).toPromise();
  }

  public async setPending() {
    this.situation = SchedulingSituation.PENDING;
    await this.getSchedulings();
  }

  public async setFinish() {
    this.situation = SchedulingSituation.FINISH;
    await this.getSchedulings();
  }

  public async setCanceled() {
    this.situation = SchedulingSituation.CANCELED;
    await this.getSchedulings();
  }

}

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
  public totalElements = 0;

  constructor(
    private schedulingService: SchedulingService
  ) { }

  ngOnInit() {
    this.getSchedulings();
  }

  public async getSchedulings(page = 0) {
    const schedulingList = await this.schedulingService.getScheduling(
      ``, this.situation, page
    ).toPromise();
    this.schedulingList = schedulingList.contents;
    this.totalElements = schedulingList.totalElements;
  }

  public onPage(page) {
    this.getSchedulings(page.first);
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

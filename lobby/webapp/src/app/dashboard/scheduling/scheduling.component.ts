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
  public first = 0;

  public schedulingCloneId;

  constructor(
    private schedulingService: SchedulingService
  ) { }

  ngOnInit() {
    this.getSchedulings();
  }

  public redial(id) {
    this.schedulingCloneId = id;
  }

  public async getSchedulings(page = 0) {
    const schedulingList = await this.schedulingService.getScheduling(
      ``, this.situation, page
    ).toPromise();
    this.schedulingList = schedulingList.contents;
    this.totalElements = schedulingList.totalElements;
  }

  public async onPage(page) {
    this.first = page.first;
    const schedulings = await
    this.schedulingService.getScheduling(
      ``, this.situation, page.first
      ).toPromise();
    for (let i = 0; i < schedulings.contents.length; i++) {
      this.schedulingList[page.first + i] = schedulings.contents[i];
    }
    this.totalElements = schedulings.totalElements;
  }

  public async setPending() {
    this.first = 0;
    this.situation = SchedulingSituation.PENDING;
    await this.getSchedulings();
  }

  public async setFinish() {
    this.first = 0;
    this.situation = SchedulingSituation.FINISH;
    await this.getSchedulings();
  }

  public async setCanceled() {
    this.first = 0;
    this.situation = SchedulingSituation.CANCELED;
    await this.getSchedulings();
  }

}

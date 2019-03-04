import { AppToastService } from './../../core/app-toast/app-toast.service';
import { AppStorageService } from './../../core/app-storage/app-storage.service';
import { Component, OnInit } from '@angular/core';
import { Scheduling, SchedulingSituation, SchedulingService } from 'src/app/core/entities/scheduling/scheduling.service';
import { ReceptionService } from 'src/app/core/entities/reception/reception.service';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {

  public schedulingList = [] as Scheduling[];
  public situation = SchedulingSituation.PENDING;

  constructor(
    private appStorageService: AppStorageService,
    private appToastService: AppToastService,
    private receptionService: ReceptionService
  ) { }

  ngOnInit() {
    this.getSchedulings();
  }

  public async getSchedulings() {
    this.schedulingList = await this.receptionService.getReception(
      ``, this.situation, 0
    ).toPromise();
  }

  public async finalizeScheduling(schedulingId: number) {
    await this.receptionService.updateReception({
      id: schedulingId,
      company_id: this.appStorageService.getToken().company_id,
      situation: SchedulingSituation.FINISH
    }).toPromise();
    this.appToastService.success('success', 'scheduling.finish.success');
    this.getSchedulings();
  }

  public async unFinish(schedulingId: number) {
    await this.receptionService.unFinish({
      id: schedulingId,
      company_id: this.appStorageService.getToken().company_id
    }).toPromise();
    this.appToastService.success('success', 'scheduling.unfinish.success');
    this.getSchedulings();
  }

  public async delete(schedulingId: number) {
    await this.receptionService.updateReception({
      id: schedulingId,
      company_id: this.appStorageService.getToken().company_id,
      situation: SchedulingSituation.CANCELED
    }).toPromise();
    this.appToastService.success('success', 'scheduling.canceled.success');
    this.getSchedulings();
  }

  public async setPending() {
    this.situation = SchedulingSituation.PENDING;
    await this.getSchedulings();
  }

  public async setInProgress() {
    this.situation = SchedulingSituation.IN_PROGRESS;
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

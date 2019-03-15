import { ActivatedRoute } from '@angular/router';
import { AppToastService } from './../../core/app-toast/app-toast.service';
import { AppStorageService } from './../../core/app-storage/app-storage.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Scheduling, SchedulingSituation, SchedulingService } from 'src/app/core/entities/scheduling/scheduling.service';
import { ReceptionService } from 'src/app/core/entities/reception/reception.service';
import { ProcedureRequirementService } from 'src/app/core/entities/procedure_requirement/procedure-requirement.service';

const showModalRequirement = () => {
  const wd = window as any;
  wd.jQuery(`#reception-requirement`).modal(`show`);
};

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {
  @ViewChild(`inProgress`) inProgress: ElementRef;
  @ViewChild(`finish`) finish: ElementRef;

  public schedulingList = [] as Scheduling[];
  public situation = SchedulingSituation.PENDING;
  public totalElements = 0;
  public requirements = [] as any[];
  public schedulingCloneId: number;

  public first = 0;
  public showAdd = true;

  private receptionDate = new Date();

  constructor(
    private appStorageService: AppStorageService,
    private appToastService: AppToastService,
    private receptionService: ReceptionService,
    private schedulingService: SchedulingService,
    private procedureRequirementService: ProcedureRequirementService,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.schedulingList = this.activedRoute.snapshot.data.schedulingData.list.contents;
    this.totalElements = this.activedRoute.snapshot.data.schedulingData.list.totalElements;
  }

  public redial(id) {
    this.schedulingCloneId = id;
  }

  public async getSchedulings(page = 0) {
    const schedulingList = await this.receptionService.getReception(
      ``, this.situation, this.appStorageService.getactiveLobby().id,
      this.receptionDate, page
    ).toPromise();
    this.schedulingList = schedulingList.contents;
    this.totalElements = schedulingList.totalElements;
  }

  public onChangeLobby() {
    this.getSchedulings();
  }

  public onChangeDate(date) {
    this.receptionDate = date;
    this.first = 0;
    this.getSchedulings();
  }

  public async onPage(page) {
    this.first = page.first;
    const schedulings = await
    this.receptionService.getReception(
      ``, this.situation, this.receptionDate, page.first
    ).toPromise();
    for (let i = 0; i < schedulings.contents.length; i++) {
      this.schedulingList[page.first + i] = schedulings.contents[i];
    }
    this.totalElements = schedulings.totalElements;
  }

  public onCheckin(id) {
    (this.inProgress.nativeElement as HTMLInputElement).click();
    this.showNotification(id);
  }

  private async showNotification(schedulingId) {
    const schedulings = await this.schedulingService.getSchedulingById(
      schedulingId
    ).toPromise();
    if (schedulings && schedulings.contents.length > 0) {
      const [scheduling] = schedulings.contents;
      const procedureListId =
      scheduling.procedures.map(procedure => procedure.procedure_id);
      const requirements =  await
        this.procedureRequirementService.getByProcedureList(procedureListId).toPromise();
      this.requirements = requirements.contents;
      showModalRequirement();
    }
  }

  public async finalizeScheduling(schedulingId: number) {
    await this.receptionService.updateReception({
      id: schedulingId,
      company_id: this.appStorageService.getToken().company_id,
      situation: SchedulingSituation.FINISH
    }).toPromise();
    this.appToastService.success('success', 'scheduling.finish.success');
    this.getSchedulings();
    this.first = 0;
  }

  public async unFinish(schedulingId: number) {
    await this.receptionService.unFinish({
      id: schedulingId,
      company_id: this.appStorageService.getToken().company_id
    }).toPromise();
    this.appToastService.success('success', 'scheduling.unfinish.success');
    this.getSchedulings();
    this.first = 0;
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
    this.first = 0;
    this.schedulingList = [];
    this.situation = SchedulingSituation.PENDING;
    await this.getSchedulings();
  }

  public async setInProgress() {
    this.first = 0;
    this.schedulingList = [];
    this.situation = SchedulingSituation.IN_PROGRESS;
    await this.getSchedulings();
  }

  public async setFinish() {
    this.first = 0;
    this.schedulingList = [];
    this.situation = SchedulingSituation.FINISH;
    await this.getSchedulings();
  }

  public async setCanceled() {
    this.first = 0;
    this.schedulingList = [];
    this.situation = SchedulingSituation.CANCELED;
    await this.getSchedulings();
  }

}

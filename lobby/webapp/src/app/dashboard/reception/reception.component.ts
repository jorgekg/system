import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from './../../core/app-toast/app-toast.service';
import { AppStorageService } from './../../core/app-storage/app-storage.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Scheduling, SchedulingSituation, SchedulingService } from 'src/app/core/entities/scheduling/scheduling.service';
import { ReceptionService } from 'src/app/core/entities/reception/reception.service';
import { ProcedureRequirementService } from 'src/app/core/entities/procedure_requirement/procedure-requirement.service';
import { CalendarView } from 'angular-calendar';

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

  public viewScreeen = CalendarView.Day;

  public schedulingList = [] as Scheduling[];
  public situation = SchedulingSituation.PENDING;
  public totalElements = 0;
  public requirements = [] as any[];
  public schedulingCloneId: number;

  public first = 0;
  public showAdd = true;
  public showLobby = false;

  constructor(
    private appStorageService: AppStorageService,
    private activedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.schedulingList = this.activedRoute.snapshot.data.schedulingData;
    if (this.appStorageService.getactiveLobby()) {
      this.showLobby = true;
    }
  }

  public onDay() {
    this.viewScreeen = CalendarView.Day;
  }

  public onWeek() {
    this.viewScreeen = CalendarView.Week;
  }
}

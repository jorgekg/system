import { AppStorageService } from './../../../core/app-storage/app-storage.service';
import { AppToastService } from './../../../core/app-toast/app-toast.service';
import { CheckinService } from './../../../core/entities/checkin/checkin.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SchedulingVisitor, SchedulingService } from './../../../core/entities/scheduling/scheduling.service';


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  @Input() schedulingId: number;
  @Input() visitor: SchedulingVisitor;
  @Input() set checkin(checkin) {
    this.checkinDetails = checkin;
    this.hasCheckin = checkin && checkin.length > 0;
  }
  @Input() showText = false;
  @Input() classModal = ``;

  @Output() updateScheduling = new EventEmitter();

  public checkinDetails = [];
  public hasCheckin = false;
  public requirements;

  constructor(
    private checkinService: CheckinService,
    private appToastService: AppToastService,
    private appStorageService: AppStorageService
  ) { }

  ngOnInit() {
  }

  public async process() {
    if (this.hasCheckin) {
      await this.unCheckin();
      this.updateScheduling.emit();
    } else {
      await this.checkinExec();
      this.updateScheduling.emit(this.schedulingId);
    }
  }

  private async unCheckin() {
    const [check] = this.checkinDetails;
    this.checkinDetails = await
    this.checkinService.unCreate({
      id: check.id,
      company_id: this.appStorageService.getToken().company_id,
      visitor_id: this.visitor.id,
      checkin_date: new Date(),
      active: 'S'
    }).toPromise();
    this.appToastService.success('checkin.success', 'uncheckin.success.message');
    this.hasCheckin = false;
  }

  private async checkinExec() {
    this.checkinDetails = await
    this.checkinService.create({
      company_id: this.appStorageService.getToken().company_id,
      visitor_id: this.visitor.id,
      checkin_date: new Date(),
      active: 'S'
    }).toPromise();
    this.appToastService.success('checkin.success', 'checkin.success.message');
    this.hasCheckin = true;
  }
}
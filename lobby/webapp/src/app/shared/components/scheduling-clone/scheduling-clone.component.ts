import { AppToastService } from './../../../core/app-toast/app-toast.service';
import { Procedures } from './../../../core/entities/procedures/procedures.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SchedulingService } from 'src/app/core/entities/scheduling/scheduling.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

const modal = () => {
  const wd = window as any;
  wd.jQuery(`#modal-scheduling-clone`).modal('show');
};

const hide = () => {
  const wd = window as any;
  wd.jQuery(`#modal-scheduling-clone`).modal('hide');
};

@Component({
  selector: 'app-scheduling-clone',
  templateUrl: './scheduling-clone.component.html',
  styleUrls: ['./scheduling-clone.component.css']
})
export class SchedulingCloneComponent implements OnInit {

  @Input() set schedulingId(id) {
    if (id) {
      this.id = id;
      this.init();
    }
  }

  @Output() update = new EventEmitter();

  public datePickerConfig = {
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    disableKeypress: false,
    allowMultiSelect: false,
    closeOnSelect: undefined,
    closeOnSelectDelay: 100,
    onOpenDelay: 0,
    weekDayFormat: 'ddd',
    appendTo: document.body,
    drops: 'down',
    opens: 'right',
    showNearMonthDays: true,
    showWeekNumbers: false,
    enableMonthSelector: true,
    format: 'DD/MM/YYYY HH:mm',
    yearFormat: 'YYYY',
    showGoToCurrent: true,
    dayBtnFormat: 'DD',
    monthBtnFormat: 'MMM',
    hours12Format: 'hh',
    hours24Format: 'HH',
    meridiemFormat: 'A',
    minutesFormat: 'mm',
    minutesInterval: 1,
    secondsFormat: 'ss',
    secondsInterval: 1,
    showSeconds: false,
    showTwentyFourHours: true,
    timeSeparator: ':',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: false,
    locale: 'pt-br'
  };

  private id;
  private scheduling;
  public validator = false;

  public form: FormGroup;

  constructor(
    private schedulingService: SchedulingService,
    private formBuilder: FormBuilder,
    private appToastService: AppToastService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      start_date: new FormControl('', Validators.compose([Validators.required])),
      end_date: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  private async init() {
    const schedulings = await this.schedulingService
      .getSchedulingById(this.id).toPromise();
    if (schedulings && schedulings.contents.length > 0) {
      this.scheduling = schedulings.contents[0];
      modal();
    }
  }

  public async onCloneScheduling() {
    this.validator = true;
    if (this.form.valid) {
      const form = this.form.getRawValue();
      form.start_date = moment(form.start_date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
      form.end_date = moment(form.end_date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
      this.scheduling.start_date = form.start_date;
      this.scheduling.end_date = form.end_date;
      this.scheduling.active = 'S';
      this.scheduling.procedures.forEach(proc => {
        proc.id = proc.procedure_id;
      });
      await this.schedulingService.clone(this.scheduling).toPromise();
      this.update.emit();
      this.appToastService.success('success', 'scheduling.toast.clone');
      hide();
    }
  }

}

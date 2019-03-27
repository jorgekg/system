import { Subscription } from 'rxjs';
import { AppToastService } from './../../core/app-toast/app-toast.service';
import { MessageService } from 'primeng/api';
import { AppStorageService } from './../../core/app-storage/app-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Lobby } from './../../core/entities/lobby/lobby.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  Procedures
} from 'src/app/core/entities/procedures/procedures.service';
import { SchedulingService, SchedulingSituation } from 'src/app/core/entities/scheduling/scheduling.service';
import * as moment from 'moment';
import { ReceptionService } from 'src/app/core/entities/reception/reception.service';

@Component({
  selector: 'app-scheduling-persist',
  templateUrl: './scheduling-persist.component.html',
  styleUrls: ['./scheduling-persist.component.css']
})
export class SchedulingPersistComponent implements OnInit {
  @ViewChild(`visitor`) visitor: ElementRef;
  public isSubmit;
  public form: FormGroup;
  public proceduresList: Procedures[] = [];
  public proceduresSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    itemsShowLimit: 5,
    allowSearchFilter: true,
    placeholder: this.translateService.instant('scheduling.procedures.search'),
    searchPlaceholderText: this.translateService.instant('search')
  };
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

  public schedulingData;
  public validator = false;
  public schedulingCloneId;

  private id;

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private activedRoute: ActivatedRoute,
    private appStorageService: AppStorageService,
    private schedulingService: SchedulingService,
    private router: Router,
    private appToastService: AppToastService,
    private receptionService: ReceptionService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      abs_id: [],
      id: [],
      lobby: new FormControl('', Validators.compose([Validators.required])),
      procedures: new FormControl('', Validators.compose([Validators.required])),
      start_date: new FormControl('', Validators.compose([Validators.required])),
      end_date: new FormControl('', Validators.compose([Validators.required])),
      responsibles: new FormControl('', Validators.compose([Validators.required])),
      visitors: new FormControl('', Validators.compose([Validators.required]))
    });
    this.schedulingData = this.activedRoute.snapshot.data.scheduling;
    this.loadProcedures();
    this.loadLobby();
    this.activedRoute.params.subscribe(params => this.id = params.id);
    if (!this.isNew()) {
      this.setScheduling();
    } else {
      if (this.activedRoute.snapshot.params) {
        this.form.get('start_date').patchValue(
          moment(this.activedRoute.snapshot.params.startDate)
        );
        this.form.get('end_date').patchValue(
          moment(this.activedRoute.snapshot.params.endDate)
        );
      }
    }
  }

  public redial() {
    this.schedulingCloneId = this.schedulingData.data.id;
  }

  public async update() {
    const schedulings = await
      this.schedulingService.getSchedulingById(this.schedulingData.data.id).toPromise() as any;
    if (schedulings && schedulings.contents.length) {
      const [scheduling] = schedulings.contents;
      this.schedulingData.data = scheduling;
      this.setScheduling();
    }
  }

  private setScheduling() {
    this.schedulingData.data.lobby = {
      id: this.schedulingData.data.lobby_id,
      name: this.schedulingData.data.lobby_name
    };
    this.schedulingData.data.procedures.forEach(procedure => {
      procedure.id = procedure.procedures.id;
      procedure.name = procedure.procedures.name;
    });
    this.schedulingData.data.start_date =
      moment(this.schedulingData.data.start_date);
    this.schedulingData.data.end_date =
      moment(this.schedulingData.data.end_date);
    this.form.patchValue(this.schedulingData.data);
    if (
      this.schedulingData.data &&
      this.schedulingData.data.situation !== SchedulingSituation.PENDING
    ) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public isNew() {
    return this.id === `new`;
  }

  public showCancel() {
    return !this.isNew() &&
      (
        this.schedulingData.data &&
        this.schedulingData.data.situation === SchedulingSituation.PENDING ||
        this.isProgress()
      );
  }

  public isProgress() {
    return this.schedulingData.data &&
      this.schedulingData.data.situation === SchedulingSituation.IN_PROGRESS;
  }

  public isCanceled() {
    return this.schedulingData.data &&
      this.schedulingData.data.situation === SchedulingSituation.CANCELED;
  }


  public async finalizeScheduling() {
    await this.receptionService.updateReception({
      id: this.form.get('id').value,
      company_id: this.appStorageService.getToken().company_id,
      situation: SchedulingSituation.FINISH
    }).toPromise();
    this.appToastService.success('scheduling.success', 'scheduling.finish.success');
    this.routerBack();
  }

  public isReception() {
    return this.router.url.includes('reception');
  }

  public routerBack() {
    if (this.router.url.includes('reception')) {
      this.router.navigate(['dashboard/reception']);
    } else {
      this.router.navigate(['dashboard/scheduling']);
    }
  }

  private loadProcedures() {
    this.proceduresList = this.schedulingData.procedures;
  }

  private loadLobby() {
    if (this.appStorageService.getactiveLobby() && this.isReception()) {
      this.form.get('lobby').patchValue(this.appStorageService.getactiveLobby());
    }
  }

  public async cancel() {
    await this.schedulingService.updateScheduling({
      id: this.schedulingData.data.id,
      company_id: this.appStorageService.getToken().company_id,
      situation: SchedulingSituation.CANCELED
    }).toPromise();
    this.appToastService.success('success', 'scheduling.canceled.success');
    this.router.navigate(['dashboard/scheduling']);
  }

  public async save(navigateById = false) {
    this.validator = true;
    if (this.form.valid) {
      const form = this.form.getRawValue();
      form.lobby_id = form.lobby.id;
      form.company_id = this.appStorageService.getToken().company_id;
      form.start_date = moment(form.start_date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
      form.end_date = moment(form.end_date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
      form.active = form.active || `S`;
      const schedulings = await this.schedulingService.create(form).toPromise();
      this.appStorageService.setScheduling(schedulings.contents[0]);
      if (!navigateById && !this.router.url.includes('reception')) {
        this.router.navigate(['dashboard/scheduling']);
      } else {
        this.router.navigate(['dashboard/reception']);
      }
      this.appToastService.success(
        'success',
        'scheduling.success'
      );
    } else {
      if (!this.form.get(`responsibles`).valid) {
        this.appToastService.error(
          'scheduling.responsible.required',
          'scheduling.responsible.required.message'
        );
      } else if (!this.form.get(`visitors`).valid) {
        this.appToastService.error(
          'scheduling.visitor.required',
          'scheduling.visitor.required.message'
        );
        (this.visitor.nativeElement as HTMLInputElement).click();
      }
    }
  }
}

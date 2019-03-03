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
import { SchedulingService } from 'src/app/core/entities/scheduling/scheduling.service';
import * as moment from 'moment';

@Component({
  selector: 'app-scheduling-persist',
  templateUrl: './scheduling-persist.component.html',
  styleUrls: ['./scheduling-persist.component.css']
})
export class SchedulingPersistComponent implements OnInit {
  @ViewChild(`visitor`) visitor: ElementRef;
  public isSubmit;
  public form: FormGroup;
  public lobbyList: Lobby[] = [];
  public lobbySelect: Lobby[];
  public lobbySettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    itemsShowLimit: 5,
    allowSearchFilter: false,
    placeholder: this.translateService.instant('scheduling.lobby.search'),
    searchPlaceholderText: this.translateService.instant('search')
  };
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

  private schedulingData;
  private schedulingChange;
  public validator = false;

  private id;
  private onChangeSchedulingSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private activedRoute: ActivatedRoute,
    private appStorageService: AppStorageService,
    private schedulingService: SchedulingService,
    private router: Router,
    private appToastService: AppToastService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      abs_id: [],
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
    }
  }

  private onChangeScheduling() {
    this.onChangeSchedulingSubscription =
    this.form.valueChanges.subscribe(value => {
        this.schedulingChange = value;
        setTimeout(async () => {
          if (this.schedulingChange === value) {
            try {
              await this.save(true);
            } catch (err) {
              this.onChangeSchedulingSubscription.unsubscribe();
              this.setScheduling();
              this.onChangeScheduling();
            }
          }
        }, 500);
    });
  }

  private setScheduling() {
    this.schedulingData.data.lobby = [
      {
        id: this.schedulingData.data.lobby_id,
        name: this.schedulingData.data.lobby_name
      }
    ];
    this.schedulingData.data.procedures.forEach(procedure => {
      procedure.id = procedure.procedures.id;
      procedure.name = procedure.procedures.name;
    });
    this.schedulingData.data.start_date =
      moment(this.schedulingData.data.start_date);
    this.schedulingData.data.end_date =
      moment(this.schedulingData.data.end_date);
    this.form.patchValue(this.schedulingData.data);
    setTimeout(() => {
      this.onChangeScheduling();
    });
  }

  public isNew() {
    return this.id === `new`;
  }

  private loadProcedures() {
    this.proceduresList = this.schedulingData.procedures;
  }

  private loadLobby() {
    this.lobbyList = this.schedulingData.lobbies;
    if (this.lobbyList && this.lobbyList.length > 0) {
      const [lobby] = this.lobbyList;
      this.lobbySelect = [lobby];
    }
  }

  public async save(navigateById = false) {
    this.validator = true;
    if (this.form.valid) {
      const form = this.form.getRawValue();
      const [lobby] = form.lobby;
      form.lobby_id = lobby.id;
      form.company_id = this.appStorageService.getToken().company_id;
      form.start_date = moment(form.start_date, 'DD/MM/YYYY HH:mm');
      form.end_date = moment(form.end_date, 'DD/MM/YYYY HH:mm');
      form.active = form.active || `S`;
      const schedulings = await this.schedulingService.create(form).toPromise();
      if (!navigateById) {
        this.router.navigate(['dashboard/scheduling']);
      } else {
        const [scheduling] = schedulings;
        this.router.navigate(['dashboard/scheduling', scheduling.id]);
      }
      this.appToastService.success(
        'success',
        'scheduling.sucsess'
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

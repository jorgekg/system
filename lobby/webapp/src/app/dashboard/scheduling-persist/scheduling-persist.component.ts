import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Lobby, LobbyService } from './../../core/entities/lobby/lobby.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  Procedures,
  ProceduresService
} from 'src/app/core/entities/procedures/procedures.service';

@Component({
  selector: 'app-scheduling-persist',
  templateUrl: './scheduling-persist.component.html',
  styleUrls: ['./scheduling-persist.component.css']
})
export class SchedulingPersistComponent implements OnInit {
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
    locale: 'pt-br',
    // min:'2017-08-29 15:50',
    // minTime:'2017-08-29 15:50'
  };

  private schedulingData;

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      lobby: [],
      procedures: [],
      start_date: new FormControl('', Validators.compose([Validators.required])),
      end_date: new FormControl('', Validators.compose([Validators.required])),
      price: new FormControl(''),
      discount: new FormControl('')
    });
    this.schedulingData = this.activedRoute.snapshot.data.scheduling;
    this.loadProcedures();
    this.loadLobby();
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

  public onSearch(term) {}
}

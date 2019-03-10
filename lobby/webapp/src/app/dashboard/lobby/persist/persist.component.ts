import { LocaleService, States } from './../../../core/entities/locale/locale.service';
import { AppStorageService } from './../../../core/app-storage/app-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { LobbyService } from './../../../core/entities/lobby/lobby.service';

const showTutorialLobby = () => {
  const wd = window as any;
  wd.jQuery('#modal-lobby-tutorial').modal(`show`)
};

@Component({
  selector: 'app-persist',
  templateUrl: './persist.component.html',
  styleUrls: ['./persist.component.css']
})
export class PersistComponent implements OnInit {
  @ViewChild('button') button: ElementRef;

  public statesList: any[] = [];
  public statesSelect: any[];
  public statesSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    itemsShowLimit: 5,
    allowSearchFilter: true,
    placeholder: this.translateService.instant('lobby.states.search'),
    searchPlaceholderText: this.translateService.instant('search')
  };
  public cityList: any[] = [];
  public citySelect: any[];
  public citySettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    itemsShowLimit: 10,
    allowSearchFilter: true,
    placeholder: this.translateService.instant('lobby.city.search'),
    searchPlaceholderText: this.translateService.instant('search'),
    noDataAvailablePlaceholderText: this.translateService.instant('select.states')
  };
  public form: FormGroup;

  public validator = false;

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private lobbyService: LobbyService,
    private appStorageService: AppStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localeService: LocaleService
  ) { }

  ngOnInit() {
    if (!this.appStorageService.getToken()) {
      this.router.navigate(['dashboard/login']);
    }
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      state_id: new FormControl('', Validators.compose([Validators.required])),
      city_id: new FormControl('', Validators.compose([Validators.required])),
      district: new FormControl('', Validators.compose([Validators.required])),
      street: new FormControl('', Validators.compose([Validators.required])),
      number: new FormControl('', Validators.compose([Validators.required]))
    });
    const tutorial = this.appStorageService.getTutorial();
    if (!tutorial || !tutorial.lobby_new) {
      showTutorialLobby();
      this.appStorageService.setTutorial('lobby_new', true);
    }
    this.setEditMode();
    this.onChangeState();
  }

  private onChangeState() {
    this.form.get('state_id').valueChanges.subscribe(async (stateSelect: States) => {
      try {
        this.selectStates(stateSelect);
      } catch (err) {}
    });
  }

  private async selectStates(stateSelect) {
    if (stateSelect) {
      const states = this.activatedRoute.snapshot.data.lobby.states.contents.filter(state =>
        stateSelect[0].id === state.id);
      if (states && states.length > 0) {
        const [state] = states;
        const cityList = await this.localeService.getCityByState(state.uf).toPromise();
        this.cityList = cityList.contents;
      }
    }
  }

  private async setEditMode() {
    const states = this.activatedRoute.snapshot.data.lobby.states;
    this.statesList = states.contents;
    const params = this.activatedRoute.snapshot.params;
    if (params && params.id !== `new`) {
      const lobby = this.activatedRoute.snapshot.data.lobby.lobby;
      lobby.state_id = this.statesList.filter(state => state.id === lobby.state_id);
      this.form.patchValue(lobby);
      await this.selectStates(lobby.state_id);
      const city = this.cityList.filter(cityFilter => cityFilter.id === lobby.city_id);
      this.form.get('city_id').patchValue(city);
    }
  }

  public isNew() {
    return this.activatedRoute.snapshot.params.id === `new`;
  }

  public async save() {
    this.validator = true;
    if (this.form.valid) {
      (this.button.nativeElement as HTMLInputElement).innerHTML =
        this.translateService.instant('await');
      try {
        const lobby = this.form.getRawValue();
        lobby.update_at = new Date();
        lobby.company_id = this.appStorageService.getToken().company_id;
        lobby.state_id = lobby.state_id[0].id;
        lobby.city_id = lobby.city_id[0].id;
        if (this.isNew()) {
          await this.lobbyService.insert(lobby).toPromise();
        } else {
          lobby.id = this.activatedRoute.snapshot.params.id;
          await this.lobbyService.update(lobby).toPromise();
        }
        this.router.navigate(['dashboard/lobby']);
      } catch (err) {}
      (this.button.nativeElement as HTMLInputElement).innerHTML =
        this.translateService.instant('add');
    }
  }

}

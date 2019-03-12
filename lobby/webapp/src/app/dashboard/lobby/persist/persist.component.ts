import { LocaleService, States } from './../../../core/entities/locale/locale.service';
import { AppStorageService } from './../../../core/app-storage/app-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { LobbyService } from './../../../core/entities/lobby/lobby.service';

const showTutorialLobby = () => {
  const wd = window as any;
  wd.jQuery('#modal-lobby-tutorial').modal(`show`)
};

const noCompletelb1 = ()  => {
  const wd = window as any;
  wd.jQuery(`#no-complete1`).attr(`autocomplete`, `new-password`);
};

const noCompletelb2 = ()  => {
  const wd = window as any;
  wd.jQuery(`#no-complete2`).attr(`autocomplete`, `new-password`);
};

@Component({
  selector: 'app-persist',
  templateUrl: './persist.component.html',
  styleUrls: ['./persist.component.css']
})
export class PersistComponent implements OnInit, AfterViewInit {
  @ViewChild('button') button: ElementRef;
  public uf = null;
  public form: FormGroup;
  public cityList = [];
  public stateList = [];

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
  }

  ngAfterViewInit() {
    noCompletelb1();
    noCompletelb2();
  }

  public async onSearchState(event) {
    const states = await this.localeService.getStateByName(event.query).toPromise();
    if (states && states.contents) {
      this.stateList = states.contents;
    }
  }

  public onSelectState(event) {
    this.uf = event.uf;
    this.form.get('city_id').enable();
  }

  public async onSearchCity(event) {
    const cities = await this.localeService.getCityByName(event.query, this.uf).toPromise();
    if (cities && cities.contents) {
      this.cityList = cities.contents;
    }
  }

  private async setEditMode() {
    const params = this.activatedRoute.snapshot.params;
    if (params && params.id !== `new`) {
      const lobby = this.activatedRoute.snapshot.data.lobby.lobby;
      const states = await this.localeService.getStates(lobby.state_id).toPromise();
      if (states && states.contents.length > 0) {
        const [state] = states.contents;
        lobby.state_id = state;
        this.uf = state.uf;
        this.form.get('city_id').enable();
        const cities = await this.localeService.getCityByState(this.uf, lobby.city_id).toPromise();
        if (cities && cities.contents.length > 0) {
          const [city] = cities.contents;
          lobby.city_id = city;
        }
      }
      this.form.patchValue(lobby);
    }
    if (!this.uf) {
      this.form.get(`city_id`).disable();
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
        lobby.state_id = lobby.state_id.id;
        lobby.city_id = lobby.city_id.id;
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

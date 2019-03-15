import { LocaleService } from './../../../core/entities/locale/locale.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LobbyService } from './../../../core/entities/lobby/lobby.service';
import { AppStorageService } from './../../../core/app-storage/app-storage.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const fastLobbyModal = ()  => {
  const wd = window as any;
  wd.jQuery(`#fast-lobby-modal`).modal(`show`);
};

const fastLobbyModHide = ()  => {
  const wd = window as any;
  wd.jQuery(`#fast-lobby-modal`).modal(`hide`);
};

const noComplete1 = ()  => {
  const wd = window as any;
  wd.jQuery(`#no-complete1`).attr(`autocomplete`, `new-password`);
};

const noComplete2 = ()  => {
  const wd = window as any;
  wd.jQuery(`#no-complete2`).attr(`autocomplete`, `new-password`);
};

@Component({
  selector: 'app-fast-lobby',
  templateUrl: './fast-lobby.component.html',
  styleUrls: ['./fast-lobby.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FastLobbyComponent,
      multi: true
    }
  ]
})
export class FastLobbyComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @ViewChild('button') button: ElementRef;

  @Output() changeLobby = new EventEmitter();

  public selectLobby;
  public lobbyList = [];
  public stateList = [];
  public cityList = [];
  public disabled = false;
  public form: FormGroup;
  private uf = null;

  public validator = false;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(
    private appStorageService: AppStorageService,
    private lobbyService: LobbyService,
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private localeService: LocaleService
  ) { }

  ngOnInit() {
    if (this.appStorageService.getactiveLobby()) {
      this.selectLobby = this.appStorageService.getactiveLobby();
    }
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      state_id: new FormControl('', Validators.compose([Validators.required])),
      city_id: new FormControl('', Validators.compose([Validators.required])),
      district: new FormControl('', Validators.compose([Validators.required])),
      street: new FormControl('', Validators.compose([Validators.required])),
      number: new FormControl('', Validators.compose([Validators.required]))
    });
    this.form.get('city_id').disable();
  }

  ngAfterViewInit() {
    noComplete2();
    noComplete1();
  }

  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: any) {
    this.selectLobby = value;
  }

  public setDisabledState(status) {
    this.disabled = status;
  }

  public async onSearch(value) {
    const lobbies = await this.lobbyService.getByName(value.query).toPromise();
    if (!lobbies.contents) {
      lobbies.contents = [];
    }
    lobbies.contents.push({
      id: null,
      name: `${value.query} (${this.translateService.instant('lobby.search.new')})`,
      newName: value.query
    });
    this.lobbyList = lobbies.contents;
  }

  public async onSearchState(event) {
    const states = await this.localeService.getStateByName(event.query).toPromise();
    if (states && states.contents) {
      this.stateList = states.contents;
    }
  }

  public async onSearchCity(event) {
    const cities = await this.localeService.getCityByName(event.query, this.uf).toPromise();
    if (cities && cities.contents) {
      this.cityList = cities.contents;
    }
  }

  public onSelectState(event) {
    this.uf = event.uf;
    this.form.get('city_id').enable();
  }

  public onSelect(event) {
    this.selectLobby = event;
    if (!this.selectLobby.id) {
      this.form.get(`name`).patchValue(this.selectLobby.newName);
      fastLobbyModal();
      this.selectLobby = null;
    } else {
      this.appStorageService.setactiveLobby(this.selectLobby);
      this.changeLobby.emit();
    }
    this.onChange(this.selectLobby);
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
        const newLobby = await this.lobbyService.insert(lobby).toPromise();
        if (newLobby && newLobby.contents.length > 0) {
          const [lb] = newLobby.contents;
          this.selectLobby = lb;
          this.appStorageService.setactiveLobby(lb);
          this.changeLobby.emit();
          fastLobbyModHide();
        }
      } catch (err) {}
      (this.button.nativeElement as HTMLInputElement).innerHTML =
        this.translateService.instant('add');
    }
  }

}
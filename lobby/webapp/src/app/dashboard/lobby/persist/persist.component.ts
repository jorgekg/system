import { AppStorageService } from './../../../core/app-storage/app-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { LobbyService } from './../../../core/entities/lobby/lobby.service';

@Component({
  selector: 'app-persist',
  templateUrl: './persist.component.html',
  styleUrls: ['./persist.component.css']
})
export class PersistComponent implements OnInit {
  @ViewChild('button') button: ElementRef;

  public form: FormGroup;

  public validator = false;

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private lobbyService: LobbyService,
    private appStorageService: AppStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      start_date: new FormControl('', Validators.compose([Validators.required])),
      end_date: new FormControl('', Validators.compose([Validators.required]))
    });
    this.setEditMode();
  }

  private async setEditMode() {
    const params = this.activatedRoute.snapshot.params;
    if (params && params.id !== `new`) {
      const lobby = this.activatedRoute.snapshot.data.lobby;
      this.form.patchValue(lobby);
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

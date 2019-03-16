import { FormGroup, FormControl, Validators, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { ProceduresService } from './../../../core/entities/procedures/procedures.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const fastProceduresModal = () => {
  const wd = window as any;
  wd.jQuery(`#fast-procedures-modal`).modal(`show`);
}

@Component({
  selector: 'app-fast-procedures',
  templateUrl: './fast-procedures.component.html',
  styleUrls: ['./fast-procedures.component.css']
})
export class FastProceduresComponent implements OnInit, ControlValueAccessor {

  public selectProcedure = [];
  public proceduresList = [];
  public validator = false;
  public disabled = false;
  public form: FormGroup;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(
    private proceduresService: ProceduresService,
    private translateService: TranslateService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      price: new FormControl('', Validators.compose([Validators.required])),
      time: [],
      detail: []
    });
  }

  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: any) {
    this.selectProcedure = value;
  }

  public setDisabledState(status) {
    this.disabled = status;
  }

  public onSelect(event) {
    if (!event.id) {
      this.form.get(`name`).patchValue(event.id);
      fastProceduresModal();
    } else {
      if (this.selectProcedure.length === 0) {
        this.selectProcedure = event;
      } else {
        this.selectProcedure.push(event);
      }
      this.onChange(this.selectProcedure);
    }
  }

  public async onSearch(value) {
    const procedures = await this.proceduresService.getByName(value.query).toPromise();
    if (!procedures.contents) {
      procedures.contents = [];
    }
    procedures.contents.push({
      id: null,
      name: `${value.query} (${this.translateService.instant('procedures.search.new')})`,
      newName: value.query
    });
    this.proceduresList = procedures.contents;
  }

  public save() {

  }

}

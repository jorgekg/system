import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AppStorageService } from './../../../core/app-storage/app-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/core/entities/person/person.service';

@Component({
  selector: 'app-scheduler-responsible',
  templateUrl: './scheduler-responsible.component.html',
  styleUrls: ['./scheduler-responsible.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SchedulerResponsibleComponent,
      multi: true
    }
  ]
})
export class SchedulerResponsibleComponent implements ControlValueAccessor {

  public responsibleList = [];
  public personList = [];

  public personAdd;
  public person;
  public disabled = false;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(
    private translateService: TranslateService,
    private personService: PersonService,
    private appStorageService: AppStorageService
  ) { }

  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: any) {
    this.responsibleList = value && value.length > 0 ? value : null;
  }

  public setDisabledState(status) {
    this.disabled = status;
  }

  public async onSeach(term) {
    if (term.query) {
      const peoples = await this.personService.getByName(
        term.query, 'S', this.appStorageService.getToken().company_id
      ).toPromise();
      this.personList = peoples.contents.map((person: any) => {
        return {
          ...person,
          label: `${person.name} (${person.document})`
        };
      });
      this.personList.push({
        id: null,
        label: `${term.query} (${
          this.translateService.instant('scheduling.new.responsible')
        })`,
        nameNotNew: term.query
      });
    }
  }

  public async selectPerson(person) {
    if (person) {
      if (person.id) {
        const peopleContents = await this.personService.getAll(person.id).toPromise();
        const [people] = peopleContents.contents;
        const reponsible = {
          id: this.responsibleList ? this.responsibleList.length : 0,
          person: people
        };
        if (this.responsibleList && this.responsibleList.length > 0) {
          if (!this.isDuplicated(people)) {
            this.responsibleList.push(reponsible);
            this.onChange(this.responsibleList);
          }
        } else {
          this.responsibleList = [reponsible];
          this.onChange(this.responsibleList);
        }
      } else {
        this.personAdd = person.nameNotNew;
      }
    }
    setTimeout(() => {
      this.person = null;
    });
  }

  private isDuplicated(person) {
    return this.responsibleList.filter(responsible => responsible.person.id === person.id).length > 0;
  }

  public onAddPerson(person) {
    const responsivel = {
      id: this.responsibleList ? this.responsibleList.length : 0,
      person: person
    };
    if (this.responsibleList && this.responsibleList.length) {
      this.responsibleList.push(responsivel);
      this.onChange(this.responsibleList);
    } else {
      this.responsibleList = [responsivel];
      this.onChange(this.responsibleList);
    }
  }

  public onDelete(id) {
    const index = this.responsibleList.findIndex(responsible => responsible.id === id);
    this.responsibleList.splice(index, 1);
    this.onChange(this.responsibleList);
  }

}

import { AppStorageService } from './../../../core/app-storage/app-storage.service';
import { Component, OnInit, forwardRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PersonService } from 'src/app/core/entities/person/person.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-scheduler-visitor',
  templateUrl: './scheduler-visitor.component.html',
  styleUrls: ['./scheduler-visitor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SchedulerVisitorComponent,
      multi: true
    }
  ]
})
export class SchedulerVisitorComponent implements ControlValueAccessor {

  public visitorList = [];
  public personList = [];
  public person;

  public personAdd;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(
    private translateService: TranslateService,
    private personService: PersonService
  ) { }

  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: any) {
    this.visitorList = value && value.length > 0 ? value : null;
  }

  public async onSeach(term) {
    if (term.query) {
      const peoples = await this.personService.getByName(term.query, 'S').toPromise();
      this.personList = peoples.map((person: any) => {
        return {
          ...person,
          label: `${person.name} (${person.document})`
        };
      });
      this.personList.push({
        id: null,
        label: `${term.query} (${
          this.translateService.instant('scheduling.new.visitor')
        })`,
        nameNotNew: term.query
      });
    }
  }

  public async selectPerson(person) {
    if (person) {
      if (person.id) {
        const [people] = await this.personService.getAll(person.id).toPromise();
        const reponsible = {
          id: this.visitorList ? this.visitorList.length : 0,
          person: people
        };
        if (this.visitorList && this.visitorList.length > 0) {
          if (!this.isDuplicated(people)) {
            this.visitorList.push(reponsible);
            this.onChange(this.visitorList);
          }
        } else {
          this.visitorList = [reponsible];
          this.onChange(this.visitorList);
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
    return this.visitorList.filter(responsible => responsible.person.id === person.id).length > 0;
  }

  public onAddPerson(person) {
    const responsivel = {
      id: this.visitorList ? this.visitorList.length : 0,
      person: person
    };
    if (this.visitorList && this.visitorList.length) {
      this.visitorList.push(responsivel);
      this.onChange(this.visitorList);
    } else {
      this.visitorList = [responsivel];
      this.onChange(this.visitorList);
    }
  }

  public onDelete(id) {
    const index = this.visitorList.findIndex(responsible => responsible.id === id);
    this.visitorList.splice(index, 1);
  }

}

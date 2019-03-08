import { Router } from '@angular/router';
import { AppStorageService } from './../../../core/app-storage/app-storage.service';
import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PersonService } from 'src/app/core/entities/person/person.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SchedulingService } from 'src/app/core/entities/scheduling/scheduling.service';
import { ProcedureRequirementService } from 'src/app/core/entities/procedure_requirement/procedure-requirement.service';

const showModalRequirement = () => {
  const wd = window as any;
  wd.jQuery(`#reception-requirement`).modal(`show`);
};

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
export class SchedulerVisitorComponent implements ControlValueAccessor, OnInit {

  @Input() isNew: boolean;
  @Input() schedulingId: number;
  @Output() updateScheduling = new EventEmitter();

  public visitorList = [];
  public personList = [];
  public person;
  public disabled = false;
  public requirements = [] as any[];

  public personAdd;
  public isReception = false;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(
    private translateService: TranslateService,
    private personService: PersonService,
    private router: Router,
    private schedulingService: SchedulingService,
    private procedureRequirementService: ProcedureRequirementService
  ) { }

  ngOnInit() {
    if (this.router.url.includes('reception')) {
      this.isReception = true;
    }
  }

  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: any) {
    this.visitorList = value && value.length > 0 ? value : null;
  }

  public setDisabledState(status) {
    this.disabled = status;
  }

  public update(id) {
    this.updateScheduling.emit();
    if (id) {
      this.showNotification(id);
    }
  }

  private async showNotification(schedulingId) {
    const schedulings = await this.schedulingService.getSchedulingById(
      schedulingId
    ).toPromise();
    if (schedulings && schedulings.contents.length > 0) {
      const [scheduling] = schedulings.contents;
      const procedureListId =
      scheduling.procedures.map(procedure => procedure.procedure_id);
      const requirements =  await
        this.procedureRequirementService.getByProcedureList(procedureListId).toPromise();
      this.requirements = requirements.contents;
      showModalRequirement();
    }
  }

  public async onSeach(term) {
    if (term.query) {
      const peoples = await this.personService.getByName(term.query, 'S').toPromise();
      this.personList = peoples.contents.map((person: any) => {
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
        const peopleContents = await this.personService.getAll(person.id).toPromise();
        const [people] = peopleContents.contents;
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
    this.onChange(this.visitorList);
  }

}

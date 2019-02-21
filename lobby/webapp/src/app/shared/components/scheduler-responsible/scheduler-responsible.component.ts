import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduler-responsible',
  templateUrl: './scheduler-responsible.component.html',
  styleUrls: ['./scheduler-responsible.component.css']
})
export class SchedulerResponsibleComponent implements OnInit {

  public responsibleList = [];
  public personList = [];

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit() {
  }

  public onSeach(term) {
    if (term.query) {
      this.personList = [
        {
          id: null,
          name: `${term.query} (${
            this.translateService.instant('scheduling.new.responsible')
          })`,
          nameNotNew: term.query
        }
      ]
    }
  }

}

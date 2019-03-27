import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  isSameDay,
  isSameMonth,
  addMinutes
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarDateFormatter
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { CustomDateFormatter } from './calendar.provider';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { AppStorageService } from 'src/app/core/app-storage/app-storage.service';
import { Scheduling, SchedulingService } from 'src/app/core/entities/scheduling/scheduling.service';

const colors = [
  {
    primary: '#ffffff',
    secondary: '#4e73df'
  },
  {
    primary: '#ffffff',
    secondary: 'green'
  },
  {
    primary: '#ffffff',
    secondary: '#e3bc08'
  }
];

const scrollTopFixed = () => {
  const wd = window as any;
  wd.jQuery(window).scroll(function(event){
    const st = $(this).scrollTop();
    if (st > 200) {
      wd.jQuery(`.day-view-column-headers`).addClass(`fixed`);
    } else {
      wd.jQuery(`.day-view-column-headers`).removeClass(`fixed`);
    }
 });
};


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarComponent implements OnInit {

  @Input() set schedulings(schedulings) {
    this.setResponsibles(
      schedulings ||
      this.appStorageService.getSchedulings()
    );
    this.setScheduling(
      schedulings ||
      this.appStorageService.getSchedulings()
    );
  }

  @Input() set viewScreeen(view) {
    this.setView(view);
  }

  public startHour = 0;
  public endHour = 23;

  public hourSegments = 3;

  view: CalendarView = CalendarView.Day;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  locale = 'br';

  public actions: CalendarEventAction[] = [];

  public refresh: Subject<any> = new Subject();

  public events: CalendarEvent[] = [];

  public responsibles = [];

  constructor(
    private router: Router,
    private appStorageService: AppStorageService,
    private schedulingService: SchedulingService
  ) {}

  ngOnInit() {
    scrollTopFixed();
    this.setView(CalendarView.Day);
  }

  private setResponsibles(schedulings: Scheduling[]) {
    schedulings.forEach(scheduling =>
      scheduling.responsibles.forEach((responsible: any) => {
        if (!this.responsibles.some(respo => respo.id === responsible.person.id)) {
          this.responsibles[responsible.person.id] = {
            id: responsible.person.id,
            name: responsible.person.name,
            color: colors[(Math.floor(Math.random() * 3))]
          };
        }
      })
    );
  }

  private setScheduling(schedulings: Scheduling[]) {
    schedulings.forEach((scheduling: any) => {
      scheduling.responsibles.forEach((responsible: any) => {
        scheduling.visitors.forEach((visitor: any) => {
          this.events.push({
            id: scheduling.id,
            abs_id: scheduling.abs_id,
            start: moment(scheduling.start_date).toDate(),
            end: moment(scheduling.end_date).toDate(),
            actions: this.actions,
            title: `${visitor.person.name} - ${scheduling.procedures[0].procedures.name}`,
            color: this.responsibles[responsible.person.id].color,
            meta: {
              user: this.responsibles[responsible.person.id]
            },
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            draggable: true
          } as any);
        });
      });
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    
  }

  public handleEvent(event, object) {
    this.router.navigate(['dashboard/reception', object.id]);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        const scheduling = this.appStorageService.getSchedulings()
          .find(appScheduling => appScheduling.abs_id === (event as any).abs_id );
        scheduling.end_date = newEnd;
        scheduling.start_date = newStart;
        this.schedulingService.addOnSubscribe(scheduling);
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
  }

  handleClick(date: any): void {
    this.router.navigate(['dashboard/reception/new', {
        startDate: moment(date.date).format('YYYY-MM-DD HH:mm'),
        endDate: moment(addMinutes(date.date, (60 / this.hourSegments))).format('YYYY-MM-DD HH:mm')
    }]);
  }

  setView(view: CalendarView) {
    this.view = view;
  }
}

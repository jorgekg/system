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
    primary: 'green',
    secondary: 'green'
  },
  {
    primary: '#e3bc08',
    secondary: '#e3bc08'
  }
];


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

  public startHour = 0;
  public endHour = 23;

  public hourSegments = 3;

  view: CalendarView = CalendarView.Day;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  locale = 'br';

  public actions: CalendarEventAction[] = [
   {
      label: '<i class="fa fa-fw fa-edit"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
      }
    },
    {
      label: '<i class="fa fa-fw fa-trash"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
      }
    }
  ];

  public refresh: Subject<any> = new Subject();

  public events: CalendarEvent[] = [];

  public activeDayIsOpen = true;

  public responsibles = [];

  constructor(
    private router: Router,
    private appStorageService: AppStorageService,
    private schedulingService: SchedulingService
  ) {}

  ngOnInit() {
    this.startHour = moment().hour() - 3;
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
          });
        });
      });
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        const scheduling = this.appStorageService.getSchedulings()
          .find(appScheduling => appScheduling.id === event.id);
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

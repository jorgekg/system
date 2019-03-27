import { Component, EventEmitter, Injectable, Output, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarDayViewComponent, CalendarUtils, DateAdapter, CalendarEventTimesChangedEventType } from 'angular-calendar';
import { DayView, DayViewEvent, GetDayViewArgs, CalendarEvent } from 'calendar-utils';

const EVENT_WIDTH = 150;

// extend the interface to add the array of users
interface DayViewScheduler extends DayView {
  users: any[];
}

@Injectable()
export class DayViewSchedulerCalendarUtils extends CalendarUtils {
  getDayView(args: GetDayViewArgs): DayViewScheduler {
    const view: DayViewScheduler = {
      ...super.getDayView(args),
      users: []
    };
    view.events.forEach(({ event }) => {
      // assumes user objects are the same references,
      // if 2 users have the same structure but different object references this will fail
      if (!view.users.includes(event.meta.user)) {
        view.users.push(event.meta.user);
      }
    });
    // sort the users by their names
    view.users.sort((user1, user2) => user1.name.localeCompare(user2.name));
    view.events = view.events.map(dayViewEvent => {
      const index = view.users.indexOf(dayViewEvent.event.meta.user);
      dayViewEvent.left = index * EVENT_WIDTH; // change the column of the event
      return dayViewEvent;
    });
    view.width = view.users.length * EVENT_WIDTH;
    return view;
  }
}

@Component({
  // tslint:disable-line max-classes-per-file
  selector: 'mwl-day-view-scheduler',
  styles: [
    `
      .day-view-column-headers {
        display: flex;
        margin-left: 70px;
      }
      .day-view-column-header {
        width: 150px;
        border: solid 1px #ccc;
        text-align: center;
      }
      .cal-hour-rows {
        height: 100%;
        overflow-y: hidden!important
      }
    `
  ],
  providers: [
    {
      provide: CalendarUtils,
      useClass: DayViewSchedulerCalendarUtils
    }
  ],
  templateUrl: './scheduler.component.html'
})
export class DayViewSchedulerComponent extends CalendarDayViewComponent implements OnInit {
  view: DayViewScheduler;

  @Output() userChanged = new EventEmitter();
  @Output() hourSegmentClicked = new EventEmitter() as any;
  @Output() eventTimesChanged = new EventEmitter() as any;

  ngOnInit() {
    this.hours.forEach(hour => hour.segments.forEach(seg => seg.isStart = true))
  }

  eventDragged(dayEvent: DayViewEvent, xPixels: number, yPixels: number): void {
    if (yPixels !== 0) {
      super.dragEnded(dayEvent, { y: yPixels, x: 0 } as any); // original behaviour
    }
    if (xPixels !== 0) {
      const columnsMoved = xPixels / EVENT_WIDTH;
      const currentColumnIndex = this.view.users.findIndex(
        user => user === dayEvent.event.meta.user
      );
      const newIndex = currentColumnIndex + columnsMoved;
      const newUser = this.view.users[newIndex];
      if (newUser) {
        this.userChanged.emit({ event: dayEvent.event, newUser });
      }
    }
  }

  private shouldFireDroppedEvent(
    dropEvent: { dropData?: { event?: CalendarEvent; calendarId?: symbol } },
    date: Date,
    allDay: boolean,
    calendarId: symbol
  ) {
    return (
      dropEvent.dropData &&
      dropEvent.dropData.event &&
      (dropEvent.dropData.calendarId !== calendarId ||
        (dropEvent.dropData.event.allDay && !allDay) ||
        (!dropEvent.dropData.event.allDay && allDay))
    );
  }

  eventDropped(
    dropEvent: { dropData?: { event?: CalendarEvent; calendarId?: symbol } },
    date: Date,
    allDay: boolean
  ): void {
    if (this.shouldFireDroppedEvent(dropEvent, date, allDay, this.calendarId)) {
      this.eventTimesChanged.emit({
        type: CalendarEventTimesChangedEventType.Drop,
        event: dropEvent.dropData.event,
        newStart: date,
        allDay
      });
    }
  }
}
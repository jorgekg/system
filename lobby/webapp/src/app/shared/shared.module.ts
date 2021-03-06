import { ToastModule } from 'primeng/toast';
import { PricePipe } from './../price.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DpDatePickerModule } from 'ng2-date-picker';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { RequiredDirective } from './diretive/required.directive';
import { NavbarTopComponent } from './components/navbar-top/navbar-top.component';
import { NavbarLeftComponent } from './components/navbar-left/navbar-left.component';
import { TableComponent } from './components/table/table.component';
import { DeleteComponent } from './components/delete/delete.component';
import { SchedulerResponsibleComponent } from './components/scheduler-responsible/scheduler-responsible.component';
import { FastPersonComponent } from './components/fast-person/fast-person.component';
import { PhoneMaskModule } from '@sam-senior/phone-mask';
import { PhoneMaskPipe } from './pipe/phone.pipe';
import { SchedulerVisitorComponent } from './components/scheduler-visitor/scheduler-visitor.component';
import { WarningComponent } from './components/warning/warning.component';
import { PersonOnListComponent } from './components/person-on-list/person-on-list.component';
import { CheckinComponent } from './components/checkin/checkin.component';
import { NextDayComponent } from './components/next-day/next-day.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SelectLobbyComponent } from './components/select-lobby/select-lobby.component';
import { DatetimePipe } from './pipe/datetime/datetime.pipe';
import { FastLobbyComponent } from './components/fast-lobby/fast-lobby.component';
import { FastProceduresComponent } from './components/fast-procedures/fast-procedures.component';
import { CardReportComponent } from './card-report/card-report.component';
import { CancelComponent } from './components/cancel/cancel.component';
import { SchedulingCloneComponent } from './components/scheduling-clone/scheduling-clone.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './calendar/day/day.component';
import { DayViewSchedulerComponent } from './calendar/scheduler/scheduler.component';

@NgModule({
  declarations: [
    RequiredDirective,
    NavbarTopComponent,
    NavbarLeftComponent,
    TableComponent,
    PricePipe,
    DeleteComponent,
    SchedulerResponsibleComponent,
    FastPersonComponent,
    PhoneMaskPipe,
    SchedulerVisitorComponent,
    WarningComponent,
    PersonOnListComponent,
    CheckinComponent,
    NextDayComponent,
    BreadcrumbComponent,
    SelectLobbyComponent,
    DatetimePipe,
    FastLobbyComponent,
    FastProceduresComponent,
    CardReportComponent,
    CancelComponent,
    SchedulingCloneComponent,
    EmptyStateComponent,
    CalendarComponent,
    DayComponent,
    DayViewSchedulerComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskModule.forRoot(),
    CurrencyMaskModule,
    SelectDropDownModule,
    AutoCompleteModule,
    NgMultiSelectDropDownModule.forRoot(),
    DpDatePickerModule,
    PhoneMaskModule,
    ToastModule,
    TableModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })

  ],
  exports: [
    TranslateModule,
    RequiredDirective,
    FormsModule,
    ReactiveFormsModule,
    NavbarTopComponent,
    NavbarLeftComponent,
    NgxMaskModule,
    TableComponent,
    CurrencyMaskModule,
    PricePipe,
    SelectDropDownModule,
    AutoCompleteModule,
    DeleteComponent,
    NgMultiSelectDropDownModule,
    DpDatePickerModule,
    SchedulerResponsibleComponent,
    FastPersonComponent,
    PhoneMaskModule,
    PhoneMaskPipe,
    SchedulerVisitorComponent,
    WarningComponent,
    ToastModule,
    PersonOnListComponent,
    CheckinComponent,
    TableModule,
    NextDayComponent,
    BreadcrumbComponent,
    SelectLobbyComponent,
    DatetimePipe,
    FastLobbyComponent,
    FastProceduresComponent,
    CardReportComponent,
    CancelComponent,
    SchedulingCloneComponent,
    EmptyStateComponent,
    CalendarComponent,
    DayComponent,
    CalendarModule
  ]
})
export class SharedModule {}

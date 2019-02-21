import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './interceptor.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'pt'}
  ]
})
export class CoreModule { }

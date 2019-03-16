import { CoreModule } from './../core/core.module';
import { SharedModule } from './../shared/shared.module';
import { ErrorRoutingModule } from './error-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error5xxComponent } from './error5xx/error5xx.component';

@NgModule({
  declarations: [Error5xxComponent],
  imports: [
    ErrorRoutingModule,
    CommonModule,
    SharedModule,
    CoreModule
  ]
})
export class ErrorModule { }

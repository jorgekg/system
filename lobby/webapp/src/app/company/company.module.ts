import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { CompanyRoutingModule } from './company-routing.module';
import { AddressComponent } from './address/address.component';

@NgModule({
  declarations: [CreateComponent, AddressComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule
  ]
})
export class CompanyModule { }

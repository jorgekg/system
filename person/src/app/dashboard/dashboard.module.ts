import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { PersonComponent } from './person/person.component';
import { PersistComponent } from './person/persist/persist.component';

@NgModule({
  declarations: [PersonComponent, PersistComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, CoreModule]
})
export class DashboardModule {}

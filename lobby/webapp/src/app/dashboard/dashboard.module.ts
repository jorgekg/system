import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ForgetComponent } from './forget/forget.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { SuccessComponent } from './forget/success/success.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LobbyComponent } from './lobby/lobby.component';
import { PersistComponent as PersistLobbyComponent} from './lobby/persist/persist.component';
import { RequirementComponent } from './requirement/requirement.component';
import { PersistComponent as PersistRequirementComponent } from './requirement/persist/persist.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { PersistComponent as  PersistProceduresComponent} from './procedures/persist/persist.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { SchedulingPersistComponent } from './scheduling-persist/scheduling-persist.component';
import { ReceptionComponent } from './reception/reception.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgetComponent,
    SuccessComponent,
    HomePageComponent,
    LobbyComponent,
    PersistLobbyComponent,
    RequirementComponent,
    PersistRequirementComponent,
    ProceduresComponent,
    PersistProceduresComponent,
    SchedulingComponent,
    SchedulingPersistComponent,
    ReceptionComponent
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, CoreModule]
})
export class DashboardModule {}

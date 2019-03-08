import { SchedulingPersistResolve } from './scheduling-persist/scheduling-persist.resolve';
import { SchedulingPersistComponent } from './scheduling-persist/scheduling-persist.component';
import { ProceduresPersistResolve } from './procedures/persist/procedures-persist.resolve';
import { ProceduresResolve } from './procedures/procedures.resolve';
import { RequirementResolve } from './requirement/requirement.resolve';
import { LobbyResolve } from './lobby/lobby.resolve';
import { PersistComponent as PersistRequirementComponent } from './requirement/persist/persist.component';
import { RequirementComponent } from './requirement/requirement.component';
import { LobbyComponent } from './lobby/lobby.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgetComponent } from './forget/forget.component';
import { SuccessComponent } from './forget/success/success.component';
import { PersistComponent as PersisteLobbyComponente } from './lobby/persist/persist.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { PersistComponent as PersistProceduresComponent } from './procedures/persist/persist.component';
import { LobbyPersistResolve } from './lobby/persist/lobby-persist.resolve';
import { RequirementPersistResolve } from './requirement/persist/requirement-persist.resolve';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { ReceptionComponent } from './reception/reception.component';
import { resolve } from 'url';
import { ReceptionResolve } from './reception/reception.resolve';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forget',
    component: ForgetComponent
  },
  {
    path: 'forget/success',
    component: SuccessComponent
  },
  {
    path: 'lobby',
    component: LobbyComponent,
    resolve: {
      lobbies: LobbyResolve
    }
  },
  {
    path: 'lobby/:id',
    component: PersisteLobbyComponente,
    resolve: {
      lobby: LobbyPersistResolve
    }
  },
  {
    path: 'requirement',
    component: RequirementComponent,
    resolve: {
      requirements: RequirementResolve
    }
  },
  {
    path: 'requirement/:id',
    component: PersistRequirementComponent,
    resolve: {
      requirement: RequirementPersistResolve
    }
  },
  {
    path: 'procedures',
    component: ProceduresComponent,
    resolve: {
      procedures: ProceduresResolve
    }
  },
  {
    path: 'procedures/:id',
    component: PersistProceduresComponent,
    resolve: {
      procedure: ProceduresPersistResolve
    }
  },
  {
    path: 'scheduling',
    component: SchedulingComponent,
  },
  {
    path: 'reception',
    component: ReceptionComponent,
    resolve: {
      schedulingData: ReceptionResolve
    }
  },
  {
    path: 'scheduling/:id',
    component: SchedulingPersistComponent,
    resolve: {
      scheduling: SchedulingPersistResolve
    }
  },
  {
    path: 'reception/:id',
    component: SchedulingPersistComponent,
    resolve: {
      scheduling: SchedulingPersistResolve
    }
  },
  {
    path: '',
    component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    LobbyResolve,
    LobbyPersistResolve,
    RequirementResolve,
    RequirementPersistResolve,
    ProceduresResolve,
    ProceduresPersistResolve,
    SchedulingPersistResolve,
    ReceptionResolve
  ]
})
export class DashboardRoutingModule { }

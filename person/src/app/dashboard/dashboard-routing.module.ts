import { PersonPersistResolve } from './person/persist/person-persist.resolve';
import { PersistComponent } from './person/persist/persist.component';
import { PersonResolve } from './person/person.resolve';
import { PersonComponent } from './person/person.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PersonComponent,
    resolve: {
      people: PersonResolve
    }
  },
  {
    path: 'person',
    component: PersonComponent,
    resolve: {
      people: PersonResolve
    }
  },
  {
    path: 'person/:id',
    component: PersistComponent,
    resolve: {
      person: PersonPersistResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    PersonResolve,
    PersonPersistResolve
  ]
})
export class DashboardRoutingModule { }

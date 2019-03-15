import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SchedulingRatingComponent } from './scheduling-rating/scheduling-rating.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'scheduling/rating/:id',
    component: SchedulingRatingComponent
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'company',
    loadChildren: './company/company.module#CompanyModule'
  },
  {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

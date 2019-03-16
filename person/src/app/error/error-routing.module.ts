import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error5xxComponent } from './error5xx/error5xx.component';

const routes: Routes = [
  {
    path: '500',
    component: Error5xxComponent
  },
  {
    path: '400',
    component: Error5xxComponent
  },
  {
    path: '',
    component: Error5xxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }

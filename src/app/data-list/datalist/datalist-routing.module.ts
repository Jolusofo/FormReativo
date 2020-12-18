import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataListComponent} from '../data-list.component';

const routes: Routes = [


  {
    path: '', component: DataListComponent , pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatalistRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataEditComponent} from './data-edit.component';
const routes: Routes = [

{
  path: '', component: DataEditComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataEditRoutingModule { }

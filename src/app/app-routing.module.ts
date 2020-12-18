import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataFormComponent } from './data-form/data-form.component';


const routes: Routes = [
  {
    path: "", component: DataFormComponent, pathMatch: 'full'
  },
  

{path: 'lista', loadChildren: () => import('./data-list/datalist/datalist.module').then((m) => m.DatalistModule) },

{path: 'editar/:id', loadChildren: () => import('./data-edit/data-edit.module').then((m) => m.DataEditModule) },






  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/* 
  {
      path: 'lista',
      loadChildren: 'app/data-list/data-list.module#DataListModule'
{
  path: "lista", component: DataListComponent, 
},



    
}, */

/* {
  path: 'lista', loadChildren: 'app/data-list/data-list.module#DataListModule'
}, */

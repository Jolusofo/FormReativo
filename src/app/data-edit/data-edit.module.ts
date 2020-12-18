import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataEditRoutingModule } from './data-edit-routing.module';
import { DataEditComponent } from './data-edit.component';
import { FormsModule }   from '@angular/forms';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [DataEditComponent],
  imports: [
    CommonModule,
    DataEditRoutingModule,
    FormsModule,
    MatCardModule
    
  ]
})
export class DataEditModule { }

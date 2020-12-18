import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataListComponent} from '../data-list.component'
import { ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { DatalistRoutingModule } from './datalist-routing.module';


@NgModule({
  declarations: [DataListComponent],
  imports: [
    CommonModule,
    DatalistRoutingModule,

    
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class DatalistModule { }

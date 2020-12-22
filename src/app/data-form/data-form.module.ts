import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataFormComponent} from './data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CampoControlErroModule} from '../campo-control-erro/campo-control-erro.module'
import {  HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {DataFormService} from './data-form.service';
@NgModule({
  declarations: [
    DataFormComponent,
    
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CampoControlErroModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    
    
  ],
  providers: [DataFormService],
})
export class DataFormModule { }

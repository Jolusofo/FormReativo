import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//material
import {MatToolbarModule} from '@angular/material/toolbar';


import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
//

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { ReactiveFormsModule } from '@angular/forms';

import {DataFormModule} from './data-form/data-form.module';
import {DataFormService} from './data-form/data-form.service';

import {DatalistRoutingModule} from './data-list/datalist/datalist-routing.module';

import {DataEditRoutingModule} from './data-edit/data-edit-routing.module';





@NgModule({
  declarations: [
    AppComponent,
    
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DataFormModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    DataEditRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    
    DatalistRoutingModule
    
    
    
    
    
  ],
  providers: [DataFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }

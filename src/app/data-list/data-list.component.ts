import { Component, OnInit } from '@angular/core';
import {DataFormService} from '../data-form/data-form.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {

  modelLista:any = [];

  panelOpenState = false;


  constructor(private formService: DataFormService) { }

  ngOnInit(): void {

    this.CarregarLista()
  }



  
  CarregarLista(){
    this.formService.read().subscribe((data) => {
  
     this.modelLista.push(data);
  
   });console.log(this.modelLista)
 }
}

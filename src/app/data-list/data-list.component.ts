import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {DataFormService} from '../data-form/data-form.service';
import {Usuario} from '../shared/models/usuario';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {

  modelLista:Usuario [] = [];

  panelOpenState = false;


  constructor(private formService: DataFormService, public router: Router) { }

  ngOnInit(): void {

    this.CarregarLista()
  }



  
  CarregarLista(){
    this.formService.read().subscribe((data: Usuario[]) => {
  
     this.modelLista = data;

  
   });console.log(this.modelLista)
 }




 
deletar(id: number){
  if(window.confirm('Você tem certeza que deseja Excluir?')){
this.formService.deleter(id).subscribe(() => {
  
  const index = this.modelLista.findIndex((user: Usuario) => {
    return user.id === id;
  });
  if(index){
    this.modelLista.splice(index, 1);
  }
  
     });
  }
  
}
}

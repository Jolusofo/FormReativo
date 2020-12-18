import { Component, Input, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-campo-control-erro',
  templateUrl: './campo-control-erro.component.html',
  styleUrls: ['./campo-control-erro.component.css']
})
export class CampoControlErroComponent implements OnInit {

@Input() mostrarErro: Boolean;

@Input() msgErro: Boolean;
   
  constructor() { }

  ngOnInit(): void {
  }

}

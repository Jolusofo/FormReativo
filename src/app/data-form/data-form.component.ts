import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DataFormService} from './data-form.service';
import {DataListComponent} from '../data-list/data-list.component';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {


  formulario : FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private formService: DataFormService
    ) { }

  ngOnInit(): void {

    this.formulario = this.formbuilder.group({
      
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email]],
    
    
    endereco: this.formbuilder.group({
        cep: [null,  [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
        rua:[null, Validators.required],
        complemento: null,
        estado: [null, Validators.required],
        numero: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
    })
      
    });    
  }
  
  
  onSubmit(){

   // console.log(this.formulario.value);
if(this.formulario.valid){

  
  this.formService.create(this.formulario.value)
  .subscribe(dados => {
  //  console.log(dados);
    alert('Dados enviados com sucesso!');
    this.resetar();

    }, 
    )
  } else {
   //   console.log('formulario invalido');
      alert('erro');
         this.verificaValidacoesForm(this.formulario);
    } 
    
  }

  verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo=>{
    //  console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if(controle instanceof FormGroup){
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar(){
    this.formulario.reset();
  }

  verificaValidTouched(campo:string){
    return this.formulario.get(campo).invalid &&( this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }
  
  verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email');
    if(campoEmail.errors){
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  
  verificaCepInvalido(){
    let campoEmail = this.formulario.get('cep');
    if(campoEmail.errors){
      return campoEmail.errors['cep'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo:string){
    return{
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
    
  }


  consultaCEP(){
    
    let cep = this.formulario.get('endereco.cep').value;
    
    
    cep = cep.replace(/\D/g, '');


    
   if (cep != "") {

    
     var validacep = /^[0-9]{8}$/;

    
     if(validacep.test(cep)) {

       this.resetaDadosForm();

       this.http.get(`https://viacep.com.br/ws/${cep}/json`)
       .subscribe(dados =>
         this.populaDadosForm(dados)
        );


     }
   }
 }

  
  resetaDadosForm(){
          
    
    this.formulario.patchValue({
      endereco: {
        rua:null,
        
        complemento:null,
        bairro:null,
        cidade: null,
        estado: null
        }
    });
  }



  populaDadosForm(dados){

    this.formulario.patchValue({
    
    endereco: {
      rua:dados.logradouro ,
      cep: dados.cep,
      numero:'' ,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
      }
   });

  }



}

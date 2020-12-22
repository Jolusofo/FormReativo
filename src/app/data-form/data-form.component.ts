import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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
      cpf: [null, [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]], // DataFormComponent.isValidCpf
    
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
    
          
            //mascara para adicionar os . e - do CPF ////////////////////////////////////////
        document.getElementById("CPF").addEventListener("input", function() {
          var i = (<HTMLInputElement>document.getElementById("CPF")).value.length;
          var str = (<HTMLInputElement>document.getElementById("CPF")).value
          if (isNaN(Number(str.charAt(i-1)))) {
            (<HTMLInputElement>document.getElementById("CPF")).value = str.substr(0, i-1)
          }
        });
        document.addEventListener('keydown', function(event) { 
          if(event.keyCode != 46 && event.keyCode != 8){
          var i = (<HTMLInputElement>document.getElementById("CPF")).value.length;
          if (i === 3 || i === 7)
          (<HTMLInputElement>document.getElementById("CPF")).value = (<HTMLInputElement>document.getElementById("CPF")).value + ".";
          else if (i === 11) 
          (<HTMLInputElement>document.getElementById("CPF")).value = (<HTMLInputElement>document.getElementById("CPF")).value + "-";
          }
        });
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }
  
  
  onSubmit(){

   console.log(this.formulario.value);
if(this.formulario.valid){

  
  this.formService.create(this.formulario.value)
  .subscribe(dados => {
   console.log(dados);
  this.formService.showMessage('Cadastro criado com sucesso!');
    this.resetar();

    }, 
    )
  } else {
     console.log('formulario invalido');
   this.formService.showMessage('Erro ao enviar formulario, verifique os campos preenchidos!');
         this.verificaValidacoesForm(this.formulario);
    } 
    
  }


   cpf(cpf){
    cpf = cpf.replace(/\D/g, '');
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9,10].forEach(function(j){
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
            soma += parseInt(e) * ((j+2)-(i+1));
        });
        r = soma % 11;
        r = (r <2)?0:11-r;
        if(r != cpf.substring(j, j+1)) result = false;
    });
    return result;
}




  verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo=>{
    console.log(campo);
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










  /////////////////////
  
   /**
    * Valida se o CPF é valido. Deve-se ser informado o cpf sem máscara.
   */
 /*  static isValidCpf() {
    return (control: AbstractControl): Validators => {
      const cpf = control.value;
      if (cpf) {
        let numbers, digits, sum, i, result, equalDigits;
        equalDigits = 1;
        if (cpf.length < 11) {
         return null;
        }

        for (i = 0; i < cpf.length - 1; i++) {
          if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }

          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(0))) {
            return { cpfNotValid: true };
          }
          numbers = cpf.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(1))) {
            return { cpfNotValid: true };
          }
          return null;
        } else {
          return { cpfNotValid: true };
        }
     }
   return null;
 };
}

 */


}

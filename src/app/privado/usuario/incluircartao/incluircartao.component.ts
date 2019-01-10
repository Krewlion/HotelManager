import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ValidadorService } from 'src/app/shared/servicos/validador.service';
import { SweetalertService } from 'src/app/shared/servicos/sweetalert.service';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { Servicos } from 'src/app/shared/servicos/servicos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incluircartao',
  templateUrl: './incluircartao.component.html',
  styleUrls: ['./incluircartao.component.css']
})
export class IncluircartaoComponent implements OnInit {

  erroNumerocartao:string = "";
  erroDatavencimento:string = "";
  erroNomecartao:string = "";
  erroCVV:string = "";


  form:FormGroup;
  formBuilder: FormBuilder = new FormBuilder();

  constructor
    (
      private validador:ValidadorService,
      private sweet:SweetalertService,
      private http:HttpClient,
      private loading:LoadingService,
      private ser:Servicos,
      private router:Router
    ) { }

  ngOnInit() {

  }

  voltar(){

  }

  iniciarForm(){
    this.form = this.formBuilder.group({
      numerocartao:[""],
      datavencimento:[""],
      nomecartao:[""],
      cvv:[""]
    }
);
  }

  incluirCartao(){

  }

}

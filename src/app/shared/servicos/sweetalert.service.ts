import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import {GalleriaModule} from 'primeng/galleria';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ValidadorService } from 'src/app/shared/servicos/validador.service';
import { debounceTime, map } from 'rxjs/operators';
import { Servicos } from 'src/app/shared/servicos/servicos.service';
import { Observable } from 'rxjs';
import { ICidade } from 'src/app/shared/interface/interfaces';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  images:any[];

  ExibirMensagemSucesso(msgSucesso:string){

    swal({
      position: 'bottom-end',
      type: 'success',
      title: 'Operação realizada com sucesso',
      showConfirmButton: false,
      timer: 1000,
      html: msgSucesso
    })
  }

  ExibirMensagemErro(msgErro:string){
    swal({
      html: msgErro,
      title: 'Ocorreu um erro.',
      type: 'error',
      confirmButtonText: 'OK'
    })
  }

  ExibirMensagemAviso(msgAviso:string){
    swal({
      html: msgAviso,
      title: 'Alerta',
      type: 'info',
      confirmButtonText: 'OK'
    })
  }

  ExibirMensagemPermissao(msgErro:string){
    swal({
      html: msgErro,
      title: 'Sem acesso.',
      type: 'error',
      confirmButtonText: 'OK'
    })
  }

  ExibirMensagemCatch(error:any){
    let status = error.status;
    let statusText = error.status == "0" ? "Servidor indisponível" : error.statusText;
    let titulo = error.status == "0" ? "Servidor indisponível" : "Ops, ocorreu um erro";
    let html = error.status == "0" ? "Verifique a disponibilidade da API consultada." : "Ocorreu um erro durante a consulta <br> Status:"+ status + " - " + statusText

    swal({
      html: html,
      title: titulo,
      type: 'error',
      confirmButtonText: 'Fechar'
    })
  }


  ExibirGaleria(imagens:string[]){


    var html = "<mdb-carousel class='carousel slide carousel-fade' [animation]='fade'>";


    imagens.forEach(element=>{
      console.log(element);
      html = html + "<mdb-carousel-item> <div class='view w-100'> <img class='d-block w-100' src="+element+"> <div class='mask rgba-black-light waves-light' mdbWavesEffect></div> </div> <div class='carousel-caption'> <h3 class='h3-responsive'>Light mask</h3> <p>First text</p> </div> </mdb-carousel-item>";
    });
    console.log(html);

    html = html +  "</mdb-carousel>";

    console.log(html);

    swal({
      html: html,
      confirmButtonText: 'Fechar'
    })
  }

}

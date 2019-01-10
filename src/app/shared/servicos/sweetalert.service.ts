import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import {GalleriaModule} from 'primeng/galleria';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ValidadorService } from 'src/app/shared/servicos/validador.service';
import { debounceTime, map } from 'rxjs/operators';
import { Servicos } from 'src/app/shared/servicos/servicos.service';
import { Observable } from 'rxjs';
import { ICidade, ICarrinho } from 'src/app/shared/interface/interfaces';
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
      html = html + "<mdb-carousel-item> <div class='view w-100'> <img class='d-block w-100' src="+element+"> <div class='mask rgba-black-light waves-light' mdbWavesEffect></div> </div> <div class='carousel-caption'> <h3 class='h3-responsive'>Light mask</h3> <p>First text</p> </div> </mdb-carousel-item>";
    });
    html = html +  "</mdb-carousel>";
    swal({
      html: html,
      confirmButtonText: 'Fechar'
    })
  }



  ExibirConfirmacaoCarrinho(carrinho:ICarrinho){

    var data = new Date(carrinho.datainicial);
    var datafinal = new Date(carrinho.datafinal);
    swal({
      title: 'Deseja adicionar esse item ao carrinho?',
      html: `
        Entrada : ${data.toLocaleDateString('pt-BR')} <br>
        Saída : ${datafinal.toLocaleDateString('pt-BR')} <br>
        Hotel : ${carrinho.nomehotel} <br>
        R$ diária : ${carrinho.valor} <br>
        Diária(s) : ${carrinho.diarias} <br>
        R$ Final : ${carrinho.valor * carrinho.diarias}  <br>
      `,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: "Não",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, adicionar!'
    }).then((result) => {

      if (result.value) {

        var expirarem = (new Date().getTime()) + (60000 * 30);

        localStorage.setItem('suareservacarrinho', JSON.stringify({"value":carrinho, "expires": expirarem}));
        swal(
          'Sucesso!',
          'O item selecionado foi adicionado ao carrinho.',
          'success'
        )
      }
    })

  }

  ExibirInformaçãoTipoQuarto(quarto:any){


    swal({
      title: quarto.quarto,
      html: `
        Valor : ${quarto.valor} <br>
        Cama de Casal : ${quarto.camacasal} <br>
        Cama de Solteiro : ${quarto.camasolteiro} <br>
        Quantidade de hóspedes : ${quarto.qtdhospedes} <br>
        <hr>
        Ar Condicionado : ${quarto.arcondicionado === true ? "Sim" : "Não"} <br>
        Ventilador : ${quarto.ventilador === true ? "Sim" : "Não"} <br>
        Banheiro Privativo : ${quarto.banheiroprivativo === true ? "Sim" : "Não"} <br>
        Banheira : ${quarto.banheira === true ? "Sim" : "Não"} <br>
        <hr>
        Varanda :${quarto.varanda === true ? "Sim" : "Não"} <br>
        Vista para o mar : ${quarto.vistamar === true ? "Sim" : "Não"} <br>
        Vista para o por do Sol : ${quarto.vistapordosol === true ? "Sim" : "Não"} <br>
        <hr>
      `,
      type: 'warning',
      confirmButtonText: 'Ok!'
    });
  }

  ExibirConfirmacaoCarrinhoObservable(carrinho:ICarrinho){

    var data = new Date(carrinho.datainicial);
    var datafinal = new Date(carrinho.datafinal);
    return swal({
      title: 'Deseja adicionar esse item ao carrinho?',
      html: `
        Entrada : ${data.toLocaleDateString('pt-BR')} <br>
        Saída : ${datafinal.toLocaleDateString('pt-BR')} <br>
        Hotel : ${carrinho.nomehotel} <br>
        R$ diária : ${carrinho.valor.toLocaleString("pt-BR")} <br>
        Diária(s) : ${carrinho.diarias} <br>
        R$ Final : ${(carrinho.valor * carrinho.diarias).toLocaleString("pt-BR")}  <br>
        <br>
        Obs: Ao incluir esse item no carrinho, será substituido pelo anterior.
      `,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: "Não, obrigado",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, adicionar!'
    })
  }

  ExibirConfirmacaoCadastrar(){

    return swal({
      title: 'Para continuar clique na opção desejada',
      html: `
        Para prosseguir, clique em umas das opções <br>
      `,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: "Fisica",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Jurídica'
    })
  }

  ExibirConfirmacaoLogar(){

    return swal({
      title: 'Para continuar clique na opção desejada',
      html: `
        Para prosseguir, clique em umas das opções <br>
      `,
      type: 'warning',
      showCancelButton: true,
      cancelButtonClass:'warning',
      cancelButtonText: "Fisica",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Jurídica'
    })
  }

}

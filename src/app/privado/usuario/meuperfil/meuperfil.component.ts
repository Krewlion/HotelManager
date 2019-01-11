import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from 'src/app/publico/carrinho/carrinho.service';
import { Servicos } from 'src/app/shared/servicos/servicos.service';
import { SweetalertService } from 'src/app/shared/servicos/sweetalert.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IUsuario } from 'src/app/shared/interface/interfaces';

@Component({
  selector: 'app-meuperfil',
  templateUrl: './meuperfil.component.html',
  styleUrls: ['./meuperfil.component.css']
})
export class MeuperfilComponent implements OnInit {

  usuario:IUsuario = undefined;
  cartoes:any = [];
  reservas:any = [];


  constructor
  (

    public carrinho:CarrinhoService,
    private http:HttpClient,
    private ser:Servicos,
    private sweet:SweetalertService,
    private loading:LoadingService,
    private route:Router,

  )
  { }

  ngOnInit() {
    this.pegarDados();
  }

  pegarDados(){
    this.loading.conteudo = "Aguarde enquanto seus dados estão sendo consultados.";
    this.loading.exibirLoading();
    this.http.get(this.ser.retornarURL()+"Usuario/PedarDadosUsuario?idusuario="+this.ser.pegarDadosCookie().idusuariocripto)
    .subscribe((resultado:any)=>{
      if (resultado.erros == undefined){
        this.usuario = resultado;
        this.cartoes = resultado.cartoes;
        this.reservas = resultado.reservas;
      }
      else{
        this.loading.esconderLoading();
        this.sweet.ExibirMensagemErro(resultado.erros.join("<br>"));
      }
    },
    (error:any)=>{
      this.sweet.ExibirMensagemCatch(error);
      this.loading.esconderLoading();
    },
    ()=>{
      this.loading.esconderLoading();
    });
  }

}

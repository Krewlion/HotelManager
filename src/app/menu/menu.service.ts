import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Servicos } from '../shared/servicos/servicos.service';
import { IUsuario } from '../shared/interface/interfaces';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../shared/loading/loading.service';
import { SweetalertService } from '../shared/servicos/sweetalert.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  constructor(private http:HttpClient, private sweet:SweetalertService) { }

  menuobs:any[];
  logado:boolean = false;
  nomeusuario:string = "";

  totalitens:string = "";

  private _tempoSesssao: number;
  public get tempoSesssao(): number {

    return this._tempoSesssao;
  }
  public set tempoSesssao(value: number) {
    this._tempoSesssao = value;
  }

  private _tempoOcioso: number;
  public get tempoOcioso(): number {

    return this._tempoOcioso;
  }
  public set tempoOcioso(value: number) {
    this._tempoOcioso = value;
  }

  ocultarMenu() {
    this.nomeusuario = "";
  }

   exibirNomeUsuarioMenu() {
    const usuario = this.pegarDadosCookie();
    this.nomeusuario = usuario.loginusuario;
  }

  controlarMenu(){
    const usuario = this.pegarDadosCookie();
    if (usuario == undefined){
      this.logado = false;
    }
    else{
      this.nomeusuario = usuario.loginusuario;
      this.logado = true;
    }
  }

  exibirNomeClienteNoMenu() {
    const usuario = this.pegarDadosCookie();
    const nomeHtml: HTMLElement = document.getElementById('nomeCliente') as HTMLElement;
    nomeHtml.innerHTML = usuario.loginusuario;
  }

  limparTemporizador() {
    for (let i = 0; i < 300; i++) {
      window.clearInterval(i);
    }
  }

  ativarMenuLogin(){

  }

  desativarMenuLogin(){

  }

  pegarDadosCookie(): IUsuario {
    const usuario: IUsuario = JSON.parse(localStorage.getItem('suareserva'));
    return usuario;
  }


  limparCookie() {
    localStorage.removeItem('suareserva');
    localStorage.clear();
  }

  iniciarContador(temposessao:number, route:Router): number {
    let contador:HTMLInputElement = document.getElementById('contador') as HTMLInputElement;
    contador.style.backgroundColor = "white";
    contador.style.color = "gold";
    contador.style.fontWeight = "bold";
    let  loadingContador:HTMLImageElement  = document.getElementById('loadingContador') as HTMLImageElement;
    let cont = 0;
    let interval:number;
    let minutosExpirar = this.tempoSesssao //seconds
    const temposessao_alterar = this.tempoSesssao;

    let segundos = 0;
    let minutos = 0;
    document.onclick = function() {
      segundos = 0;
      const load = document.getElementById('loadingContador') as HTMLImageElement;
      load.style.display = 'none';
      minutosExpirar = temposessao_alterar;
      minutos = 0;
      contador.value = 'Sessão: ' + (minutosExpirar - minutos) + ' minutos';
    };
    document.onmousemove = function() {
      segundos = 0;
      const load = document.getElementById('loadingContador') as HTMLImageElement;
      load.style.display = 'none';
      minutosExpirar = temposessao_alterar;
      minutos = 0;
      contador.value = 'Sessão: ' + (minutosExpirar - minutos) + ' minutos';
    };
    document.onkeypress = function() {
      segundos = 0;
      const load = document.getElementById('loadingContador') as HTMLImageElement;
      load.style.display = 'none';
      minutosExpirar = temposessao_alterar;

      minutos = 0;
      contador.value = 'Sessão: ' + (minutosExpirar - minutos) + ' minutos';
    };

    segundos = cont;
    let tempoocioso = this.tempoOcioso;
    contador.value = 'Sessão: ' + (minutosExpirar - minutos) + ' minutos';
    loadingContador.style.display = 'none';
    interval = window.setInterval(CheckIdleTime, 600);
    function CheckIdleTime() {
      segundos++;
        this.cont = segundos;
        if (segundos > tempoocioso) {
          if (this.loadingContador.style.display == 'none') {
          this.loadingContador.style.display = 'block';
          }
        }
        let http:HttpClient;
        let sweet:SweetalertService = new SweetalertService();
        let Menu:MenuService = new MenuService( http, sweet);
        const usuario = Menu.pegarDadosCookie();

        if (segundos >= 60) {
          segundos = 0;
          minutos++;
          this.contador.value = 'Sessão: ' + (minutosExpirar - minutos) + ' minutos';
        }

        if (minutos >= minutosExpirar) {
          minutos = 0;
          segundos = 0;
          Menu.limparTemporizador();
          Menu.limparCookie();
          sweet.ExibirMensagemAviso("Seu tempo ocioso foi maior que "+temposessao+" minutos, ou seja, sua sessão foi encerrada automaticamente.");
        } else {
          if (minutos > minutosExpirar / 2) {
            this.contador.style.color = 'red';
          } else {
            this.contador.style.color = 'gold';
          }
        }
    }
    return interval;
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../menu/menu.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';
import {Location } from '@angular/common';
import { SweetalertService } from './sweetalert.service';
import { IUsuario, ICarrinho } from '../interface/interfaces';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})

export class Servicos{
  //url:string = 'http://herbertmauadie-001-site2.ctempurl.com/api/';
  //url:string = 'https://localhost:44354/api/';
  url:string = 'http://sf72506:8070/api/';
  constructor(private menu:MenuService, private http:HttpClient, private loading:LoadingService, private sweet: SweetalertService, private route:Router, private location:Location) {

  }

  retornarURL(){
    return this.url;
  }

  abrirCookie(usuario: IUsuario, route: Router, query:string) {
    localStorage.setItem('Metanoia', JSON.stringify(usuario));
    this.menu.exibirNomeClienteNoMenu();
    this.montarMenu();
    if(query && query != "/"){
      route.navigate([query]);
    }else{
      route.navigate(['/projeto/consultar']);
    }
  }



  limparCookie(route: Router) {
    localStorage.removeItem('Metanoia');
    localStorage.clear();
    route.navigate(['/login']);
  }

  limparCookieSemRoute() {
    localStorage.removeItem('Metanoia');
    localStorage.clear();
  }

  abrirCookieCarrinho(carrinho: ICarrinho) {
    localStorage.setItem('suareservacarrinho', JSON.stringify(carrinho));
  }

  limparCarrinho() {
    localStorage.removeItem('suareservacarrinho');
    localStorage.clear();
  }

  pegarDadosCookie(): IUsuario {
    const usuario: IUsuario = JSON.parse(localStorage.getItem('Metanoia'));
    return usuario;
  }


  alterarDadosCookie(usuario: IUsuario) {
    localStorage.setItem('Metanoia', JSON.stringify(usuario));
  }

  voltar(){
    this.location.back();
  }

  montarMenu(){
    this.loading.conteudo = "Aguarde enquanto as suas permissões estão sendo consultadas.";
    this.http.get(this.retornarURL()+"menu/MontarMenu?idusuario="+this.pegarDadosCookie().idusuario)
    .subscribe((menu:any)=>{
      if (menu.erros == undefined){
        this.menu.menuobs = menu;
      }
      else{
        this.sweet.ExibirMensagemErro(menu.erros.join("<br>"));
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

  detalharSubContratoPeloID(idsubcontrato:number){
    return this.http.get(this.retornarURL()+"subcontrato/DetalharSubContratoPeloID?idsubcontrato="+idsubcontrato+"&idusuario="+this.pegarDadosCookie().idusuario);
  }

  listarEspecialidades(){
    return this.http.get(this.retornarURL()+"Especialidade/ConsultarEspecialidades");
  }

  listarStatus(){
    return this.http.get(this.retornarURL()+"Servico/ListarStatus").pipe(
      map((status:any) => {
        return status;
      },
      (error:any) => {
        this.sweet.ExibirMensagemCatch(error);
      })
    )
  }

  listarTiposDocs(){
    return this.http.get(this.retornarURL()+"TipoDoc/ConsultarTiposDocs");
  }
}



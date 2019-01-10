import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Servicos } from '../shared/servicos/servicos.service';
import { MenuService } from './menu.service';
import { LoadingService } from '../shared/loading/loading.service';
import { SweetalertService } from '../shared/servicos/sweetalert.service';
import { HttpClient } from '@angular/common/http';
import { ICarrinho } from '../shared/interface/interfaces';
import { CarrinhoService } from '../publico/carrinho/carrinho.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  Menu:any[] = [];
  public contador: HTMLInputElement;
  public loadingContador: HTMLImageElement;
  public _cont = 0;
  private _interval: number;
  setInterval: number;

  @Input() public get tempoOcioso() :number{
    return this.MenuService.tempoOcioso;
  }

  public set tempoOcioso(value:number){
    this.MenuService.tempoOcioso = value;
  }

  @Input() public get tempoSesssao(): number{
    return this.MenuService.tempoSesssao;
  }

  public set tempoSesssao(value:number){
      this.MenuService.tempoSesssao = value;
  }

  navegarLogin() {
    this.router.navigate(['/login']);
  }

  constructor
  (
    private ser:Servicos,
    private carrinho:CarrinhoService,
    private http:HttpClient,
    private loading:LoadingService,
    private sweet:SweetalertService,
    private router:Router,
    public MenuService:MenuService
  ) {}

  ngOnInit() {
    this.carrinho.atualizarCarrinho();
    if (this.MenuService.logado){
      this.MenuService.exibirNomeUsuarioMenu();
    }
  }

  ngAfterViewInit(){

  }

  limparCookie(){
    this.MenuService.limparCookie();
    this.router.navigate([""]);
  }

  ativarSpin(){
    document.getElementById("spinMenu").classList.add("fa-spin");
  }

  desativarSpin(){
    document.getElementById("spinMenu").classList.remove("fa-spin");
  }

  montarMenu(){
    this.ser.montarMenu();
  }

  logar(){

    this.router.navigate(["usuario/login"]);

    // this.sweet.ExibirConfirmacaoLogar().then((result) => {

    //   if (result.value) {
    //     this.router.navigate(["publico/empresa/cadastrar"]);
    //   }
    //   else{
    //     this.router.navigate(["usuario/login"]);
    //   }
    // });
  }

  cadastrarUsuario(){

    this.router.navigate(["publico/usuario/cadastrar"]);

    // this.sweet.ExibirConfirmacaoCadastrar().then((result) => {

    //   if (result.value) {
    //     this.router.navigate(["publico/empresa/cadastrar"]);
    //   }
    //   else{
    //     this.router.navigate(["publico/usuario/cadastrar"]);
    //   }
    // });

  }

}

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
  }

  ngAfterViewInit(){

    // const usuariologado = this.MenuService.pegarDadosCookie();
    // if (usuariologado == undefined) {
    // } else {
    //   this.ser.montarMenu();
    //   this.MenuService.exibirNomeClienteNoMenu();
    //   usuariologado.interval = this.MenuService.iniciarContador(this.tempoSesssao, this.router);
    //   this.MenuService.exibirMenu();
    // }
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
  }

}

import { Injectable } from '@angular/core';
import { Servicos } from 'src/app/shared/servicos/servicos.service';
import { MenuService } from 'src/app/menu/menu.service';
import { ICarrinho } from 'src/app/shared/interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor(private ser:Servicos, private menu:MenuService) { }

  carrinhos:ICarrinho = undefined;

  pegarDadosCarrinho() {
    const carrinho: ICarrinho = JSON.parse(localStorage.getItem('suareservacarrinho'));
    this.carrinhos = carrinho;
  }

  atualizarDadosCarrinho(carrinho:ICarrinho[]) {
    localStorage.setItem('suareservacarrinho', JSON.stringify(carrinho));
  }

  atualizarCarrinho(){
    this.pegarDadosCarrinho();
    if (this.carrinhos == undefined){
      this.menu.totalitens = "";
    }
    else{
      this.menu.totalitens = "1";
    }
  }

  limparCarrinho() {
    localStorage.removeItem('suareservacarrinho');
    localStorage.clear();
    this.carrinhos = undefined;
  }

}

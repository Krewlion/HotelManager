import { Injectable } from '@angular/core';
import { Servicos } from 'src/app/shared/servicos/servicos.service';
import { MenuService } from 'src/app/menu/menu.service';
import { ICarrinho } from 'src/app/shared/interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor(private ser:Servicos, private menu:MenuService) { }

  carrinhos:ICarrinho[] = [];

  pegarDadosCarrinho() {
    const carrinho: ICarrinho[] = JSON.parse(localStorage.getItem('suareservacarrinho'));

    if(carrinho ==undefined){
      this.carrinhos = [];
    }
    else
    {
      this.carrinhos = carrinho;
    }
  }

  atualizarDadosCarrinho(carrinho:ICarrinho[]) {
    localStorage.setItem('suareservacarrinho', JSON.stringify(carrinho));
  }

  atualizarCarrinho(){
    this.pegarDadosCarrinho();
    if (this.carrinhos != null){
      if (this.carrinhos.length > 0){
        this.menu.totalitens = this.carrinhos.length.toString();
      }
      else{
        this.menu.totalitens = "";
      }
    }
    else{
      this.menu.totalitens = "";
    }
  }

  limparCarrinho() {
    localStorage.removeItem('suareservacarrinho');
    localStorage.clear();
    this.carrinhos = [];
  }

}

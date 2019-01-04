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

  pegarDadosCarrinho(): ICarrinho[] {
    const carrinho: ICarrinho[] = JSON.parse(localStorage.getItem('suareservacarrinho'));
    this.carrinhos = carrinho;
    return carrinho;
  }

  atualizarDadosCarrinho(carrinho:ICarrinho[]) {
    localStorage.setItem('suareservacarrinho', JSON.stringify(carrinho));
  }


  atualizarCarrinho(){
    const carrinho:ICarrinho[] = this.pegarDadosCarrinho();
    if (carrinho != null){
      if (carrinho.length > 0){
        this.menu.totalitens = carrinho.length.toString();
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

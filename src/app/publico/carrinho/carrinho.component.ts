import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MenuService } from 'src/app/menu/menu.service';
import { Servicos } from 'src/app/shared/servicos/servicos.service';
import { CarrinhoService } from './carrinho.service';
import { ICarrinho } from 'src/app/shared/interface/interfaces';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  formCarrinho:FormGroup;
  formBuilder:FormBuilder = new FormBuilder();
  totaldopedido = 0;

  constructor
  (
    private menu:MenuService,
    private ser:Servicos,
    public carrinho:CarrinhoService
  ) { }

  ngOnInit() {
    this.carrinho.carrinhos = this.carrinho.pegarDadosCarrinho();
    this.calcularTotalPedido();
    this.formCarrinho = this.formBuilder.group([

    ]);
  }

  ngAfterViewInit(){
    this.menu.totalitens = "";
  }

  removerDoCarrinho(item:ICarrinho){
    console.log(this.carrinho.carrinhos);
    var index = this.carrinho.carrinhos.indexOf(item);
    console.log(index);
    this.carrinho.carrinhos.splice(index,1);
    console.log(this.carrinho.carrinhos);
    this.carrinho.atualizarDadosCarrinho(this.carrinho.carrinhos);
    this.calcularTotalPedido();

  }

  calcularTotalPedido(){
    this.totaldopedido = 0;
    this.carrinho.carrinhos.forEach(item=>{
      var datainicial = new Date(item.datainicial);
      var datafinal = new Date(item.datafinal);
      item.datainicial = datainicial.toLocaleDateString("pt-BR");
      item.datafinal = datafinal.toLocaleDateString("pt-BR");
      this.totaldopedido = this.totaldopedido + (item.valor * item.diarias);
    })
  }

}

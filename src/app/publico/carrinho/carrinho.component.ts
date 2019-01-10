import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MenuService } from 'src/app/menu/menu.service';
import { Servicos } from 'src/app/shared/servicos/servicos.service';
import { CarrinhoService } from './carrinho.service';
import { ICarrinho } from 'src/app/shared/interface/interfaces';
import { Router } from '@angular/router';

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
    public carrinho:CarrinhoService,
    private router:Router
  ) { }

  ngOnInit() {
    this.menu.controlarMenu();
    this.carrinho.pegarDadosCarrinho();
    this.calcularTotalPedido();
    this.formCarrinho = this.formBuilder.group([

    ]);
  }

  ngAfterViewInit(){
    this.menu.totalitens = "";
  }

  removerDoCarrinho(){
    this.carrinho.limparCarrinho();

  }

  calcularTotalPedido(){
    this.totaldopedido = 0;
    if ( this.carrinho.carrinhos != undefined ){
      var datainicial = new Date(this.carrinho.carrinhos.datainicial);
      var datafinal = new Date(this.carrinho.carrinhos.datafinal);
      this.carrinho.carrinhos.datainicial = datainicial.toLocaleDateString("pt-BR");
      this.carrinho.carrinhos.datafinal = datafinal.toLocaleDateString("pt-BR");
      this.totaldopedido = this.carrinho.carrinhos.valor * this.carrinho.carrinhos.diarias;
    }
  }

  redirecionarPagamento(){
    this.router.navigate(["/privado/cliente/pagamento"]);
  }

}

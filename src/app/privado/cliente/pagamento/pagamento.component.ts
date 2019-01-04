import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CarrinhoService } from 'src/app/publico/carrinho/carrinho.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  formPagamento:FormGroup;
  formBuilder:FormBuilder = new FormBuilder();

  totaldopedido:number = 0;

  constructor(

    public carrinho:CarrinhoService

  ) { }

  ngOnInit() {
    this.carrinho.pegarDadosCarrinho();
    this.iniciarForm();
    this.calcularTotalPedido();
  }

  iniciarForm(){
    this.formPagamento = this.formBuilder.group([

    ]);
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

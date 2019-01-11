import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CarrinhoService } from 'src/app/publico/carrinho/carrinho.service';
import { HttpClient } from '@angular/common/http';
import { Servicos } from 'src/app/shared/servicos/servicos.service';
import { SweetalertService } from 'src/app/shared/servicos/sweetalert.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { Router } from '@angular/router';
import { ICartao } from 'src/app/shared/interface/interfaces';


@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  formPagamento:FormGroup;
  formBuilder:FormBuilder = new FormBuilder();
  cartoes:ICartao[] = [];
  idcartao:number = undefined;

  totaldopedido:number = 0;

  constructor(

    public carrinho:CarrinhoService,
    private http:HttpClient,
    private ser:Servicos,
    private sweet:SweetalertService,
    private loading:LoadingService,
    private route:Router,

  ) { this.iniciarForm() }

  ngOnInit() {
    this.carrinho.pegarDadosCarrinho();
    this.listarCortoesParaOUsuario();
    this.calcularTotalPedido();
  }

  iniciarForm(){
    this.formPagamento = this.formBuilder.group(
      {
        idcliente:[0],
        idquarto:[0],
        dataentrada:[0],
        datasaida:[0],
        valor:[0],
        idcartaousuario:[0],
        cvv:[0],
        idusuariocripto:[""]
      }
    );
  }

  listarCortoesParaOUsuario(){
    this.loading.conteudo = "Aguarde enquando seus cartões estão sendo consultados"
    this.loading.exibirLoading();
    var idusuario = this.ser.pegarDadosCookie().idusuariocripto;
    this.http.get(this.ser.retornarURL() + "Usuario/ListarCartoesUsuario?idusuario=" + idusuario)
      .subscribe((resultado: any) => {
        if (resultado.erros == undefined) {
          this.cartoes = resultado;
        }
        else {
          this.sweet.ExibirMensagemErro(resultado.erros.join("<br>"));
          this.loading.esconderLoading();
        }
      }
        ,
        (error: any) => {
          this.sweet.ExibirMensagemCatch(error);
          this.loading.esconderLoading();
        }
        ,
        () => {
          this.loading.esconderLoading();
        }
      )
  }

  calcularTotalPedido(){

    this.totaldopedido = 0;

    var datainicial = new Date(this.carrinho.carrinhos.datainicial);
    var datafinal = new Date(this.carrinho.carrinhos.datafinal);
    this.carrinho.carrinhos.datainicial = datainicial.toLocaleDateString("pt-BR");
    this.carrinho.carrinhos.datafinal = datafinal.toLocaleDateString("pt-BR");
    this.totaldopedido = this.carrinho.carrinhos.valor * this.carrinho.carrinhos.diarias ;

  }

  adicionarBotao(){
    this.route.navigate(["privado/usuario/incluircartao"]);
  }

  realizarPagamento(){

    if (this.idcartao == undefined){
      this.sweet.ExibirMensagemAviso("Nenhum cartão foi selecionado, antes de finalizar a reserva é necessário selecionar 1 cartão.")
      return;
    }

    this.sweet.ConfirmaçãoPagamento()
    .then((result) => {
      if (result.value) {
        if (result.value == ""){
          this.sweet.ExibirMensagemAviso("O código CVV precisa ser preenchido.")
        }
        else{
          this.formPagamento.get("cvv").patchValue(result.value);
          this.formPagamento.get("idcartaousuario").patchValue(this.idcartao);
          this.carrinho.pegarDadosCarrinho();

          var idusuariocripto = this.ser.pegarDadosCookie().idusuariocripto;

          if (this.ser.pegarDadosCookie() == undefined){
            this.sweet.ExibirMensagemAviso("Infelizmente sua sessão foi encessarada.");
            this.route.navigate(["/usuario/login"]);
            return;
          }

          if (this.carrinho.carrinhos == undefined){
            this.sweet.ExibirMensagemAviso("Infelizmente o item saiu do seu carrinho antes de realizar a reserva, adicione novamente o item ao carrinho e tente novamente.");
            return;
          }
          else{
              var item = this.carrinho.carrinhos;
              this.formPagamento.get("idusuariocripto").patchValue(idusuariocripto);
              this.formPagamento.get("idquarto").patchValue(this.carrinho.carrinhos.idquarto);
              this.formPagamento.get("dataentrada").patchValue(this.carrinho.carrinhos.datainicial);
              this.formPagamento.get("datasaida").patchValue(this.carrinho.carrinhos.datafinal);
              this.formPagamento.get("valor").patchValue(this.carrinho.carrinhos.valor * this.carrinho.carrinhos.diarias);
          }

          this.loading.conteudo = "Aguarde enquando está sendo finalizado o seu pedido da reserva.";
          this.loading.exibirLoading();

          this.http.post(this.ser.retornarURL()+"Reserva/IncluirReserva",this.formPagamento.value)
          .subscribe((resultado:any)=>{

            if (resultado.erros == undefined){
              this.sweet.ExibirMensagemSucesso("A reserva foi realizada com sucesso");
              this.carrinho.limparCarrinho();
              //Cupom de impressão
              this.route.navigate(["/privado/usuario/meuperfil"]);
            }
            else{
              this.sweet.ExibirMensagemErro(resultado.erros.join("<br>"));
            }
            this.loading.esconderLoading();

          },
          (error:any)=>{
            this.loading.esconderLoading();
            this.sweet.ExibirMensagemCatch(error);
          },
          ()=>{
            this.loading.esconderLoading();
          });
        }
      }
      else{
        if (result.value == ""){
          this.sweet.ExibirMensagemErro("O código CVV precisa ser preenchido.");
        }
      }
    });


  }

  radioChecked(id:number){
    this.idcartao = id;
  }
}

import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ValidadorService } from 'src/app/shared/servicos/validador.service';
import { debounceTime, map } from 'rxjs/operators';
import { Servicos } from 'src/app/shared/servicos/servicos.service';
import { HttpClient } from '@angular/common/http';
import { ReservasServicos } from './reservas.service';
import { Observable } from 'rxjs';
import { ICidade, IEndereco, ICarrinho } from 'src/app/shared/interface/interfaces';
import { SweetalertService } from 'src/app/shared/servicos/sweetalert.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import swal from 'sweetalert2';
import { ImagemService } from 'src/app/shared/imagens/imagem.service';
import { MenuService } from 'src/app/menu/menu.service';
import { CarrinhoService } from '../carrinho/carrinho.service';


@Component({
  selector: 'app-reservas',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  minDateValue:Date;

  formReservas: FormGroup;
  fb = new FormBuilder();
  loadingCidades = false;
  cidadeSelecionada = false;
  exibirQuartos = false;

  cidades: Observable<ICidade[]>;
  enderecos: Observable<IEndereco[]>;
  endereco:IEndereco = <IEndereco> {};

  cidadesSub: any[] = [];
  cidade:ICidade = <ICidade>{};
  quartos:any[] = [];
  en:any;

  erroDataInicial: string = "";
  erroCidade: string = "";
  erroQtdhospedes:string = "";

  constructor
  (
    private validador: ValidadorService,
    private ser: Servicos,
    private http: HttpClient,
    public reservaService: ReservasServicos,
    private sweet:SweetalertService,
    private loading:LoadingService,
    private imagem:ImagemService,
    private MenuService:MenuService,
    private carrinho:CarrinhoService
  ) {
    var currentTime = new Date()
    this.minDateValue = currentTime ;
  }


  inicializarForm() {
    this.formReservas = this.fb.group({
      cidade: ["", [Validators.required]],
      date:["", Validators.required],
      nomehotel:[""],
      qtdhospedes:["1", this.validador.ValidadorNumeroMaiorQue0]
    });
  }

  ReiniciarFormCidade() {
    var datas = this.formReservas.get('date');
    this.formReservas = this.fb.group({
      cidade: ["", [Validators.required]],
      date:datas,
      nomehotel : [""],
      qtdhospedes:[this.formReservas.get("qtdhospedes").value,, this.validador.ValidadorNumeroMaiorQue0]
    });
  }

  ReiniciarFormDatas() {
    var cidade = this.formReservas.get('cidade');
    this.formReservas = this.fb.group({
      cidade: [cidade, [Validators.required]],
      date:["", Validators.required],
      nomehotel:[""],
      qtdhospedes:[this.formReservas.get("qtdhospedes").value,, this.validador.ValidadorNumeroMaiorQue0]
    });
  }

  iniciarValidadores() {
    const cidadeControl = this.formReservas.get("cidade");
    cidadeControl.valueChanges
      .subscribe(cidade => {
        this.erroCidade = this.validador.setMessage(cidadeControl, this.validador.mensagensValidacao());
        if (cidade.length >= 2) {
          this.enderecos = this.reservaService.listarBairros(cidade);
        }
        else {
          this.enderecos = undefined;
        }

        if (this.enderecos != undefined) {
          this.enderecos.subscribe(dados => {
            if (dados == undefined) {
              this.enderecos = undefined;
            }
          })
        }
      },
      (error:any)=>{
        this.sweet.ExibirMensagemCatch(error);
      });

      const qtdHospedeControl = this.formReservas.get("qtdhospedes");

      qtdHospedeControl.valueChanges.subscribe(qtd=>{
        this.erroQtdhospedes = this.validador.setMessage(qtdHospedeControl,this.validador.mensagensValidacao());
      });

  }

  selecionarCidade(cidade: ICidade) {
    this.cidadeSelecionada = true;
    this.cidade = cidade;
  }

  selecionarBairro(endereco: IEndereco) {
    this.cidadeSelecionada = true;
    this.endereco = endereco;
  }

  voltarCidade() {
    this.cidadeSelecionada = false;
    this.cidades = undefined;
    this.ReiniciarFormCidade();
    this.iniciarValidadores();
    this.exibirQuartos = false;
    this.enderecos = undefined;
  }

  voltarDatas(){
    this.ReiniciarFormDatas();
    this.iniciarValidadores();
    this.exibirQuartos = false;
    this.enderecos = undefined;
  }

  ngOnInit() {
    this.inicializarForm();
    this.iniciarValidadores();
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["Do","Se","Te","Qu","Qu","Se","Sa"],
      monthNames: [ "Janeiro","Fevereiro","Março","April","May","June","July","August","September","October","November","December" ],
      monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
      today: 'Hoje',
      clear: 'Limpar'
  };

  }

  pesquisarDatas(){
    this.loading.conteudo = "Aguarde enquanto os quartos estão sendo consulados.";
    this.loading.exibirLoading();
    var datas = this.formReservas.get("date").value;
    console.log(datas);
    let data:string[] = [];
    datas.forEach(element => {
      data.push(element);
    });
    this.http.get(this.ser.retornarURL()+"Reserva/PesquisarQuartosParaReservaPelaData?datas="+datas+"&cdcidade="+this.endereco.cdcidade+"&cdbairro="+this.endereco.cdbairro+"&hotel="+this.formReservas.get("nomehotel").value +"&hospedes="+this.formReservas.get("qtdhospedes").value)
    .subscribe((resultado:any)=>{
      if ( resultado.erros == undefined){

        if(resultado.length > 0){
          this.quartos = resultado;
          this.exibirQuartos = true;
        }
        else{
          this.quartos = undefined;
          this.sweet.ExibirMensagemAviso("Nenhum quarto disponível foi encontrado com os parametros passados.");
        }
      }
      else{
        this.sweet.ExibirMensagemErro(resultado.erros.join("<br>"));
        this.loading.esconderLoading();
      }
    }
    ,
    (error:any)=>{
      this.sweet.ExibirMensagemCatch(error);
      this.loading.esconderLoading();
    }
    ,
    ()=>{
      this.loading.esconderLoading();
    }
    )
  }

  detalhar(imagens:string[]){
    if (imagens.length > 0){
      this.imagem.abrirModal(imagens);
    }
    else{
      this.sweet.ExibirMensagemAviso("O quarto selecionando não possui imagens.");
    }
  }

  selecionar(quarto:any){

    let carrinho:ICarrinho = <ICarrinho> {} ;
    carrinho.idquarto = quarto.idquarto;
    var datas = this.formReservas.get('date').value;
    carrinho.datainicial = datas[0];
    carrinho.datafinal = datas[1];
    carrinho.valor = quarto.valor;
    var date1 = new Date(datas[0]);
    var date2 = new Date(datas[1]);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    console.log(timeDiff);
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    carrinho.nomehotel = quarto.hotel;
    carrinho.diarias = diffDays + 1;
    //this.sweet.ExibirConfirmacaoCarrinho(carrinho);

    this.sweet.ExibirConfirmacaoCarrinhoObservable(carrinho).then((result) => {

      if (result.value) {

        let carrinhos: ICarrinho[] = JSON.parse(localStorage.getItem('suareservacarrinho'));
        if (carrinhos == undefined){
          carrinhos = [];
        }

        carrinhos.push(carrinho)

        localStorage.setItem('suareservacarrinho', JSON.stringify(carrinhos));
        this.carrinho.atualizarCarrinho();
        swal(
          'Sucesso!',
          'O item selecionado foi adicionado ao carrinho.',
          'success'
        )
      }
    })


  }

}

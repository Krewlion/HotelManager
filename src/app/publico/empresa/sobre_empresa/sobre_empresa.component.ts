import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Servicos } from 'src/app/shared/servicos/servicos.service';
import { ActivationEnd, LoadChildren, ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { SweetalertService } from 'src/app/shared/servicos/sweetalert.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MenuService } from 'src/app/menu/menu.service';


@Component({
  selector: 'app-sobre-empresa',
  templateUrl: './sobre_empresa.component.html',
  styleUrls: ['./sobre_empresa.component.css']
})
export class SobreEmpresaComponent implements OnInit {

  empresa:any  = undefined;
  formDetalheEmpresa:FormGroup;
  formBuilder:FormBuilder = new FormBuilder();
  tiposQuartos:any[] = [];

  constructor
  (
     private http:HttpClient,
     private ser:Servicos,
     private route:ActivatedRoute,
     private loading:LoadingService,
     private sweet:SweetalertService,
     private menu:MenuService
  ) { }

  ngOnInit() {
    this.menu.controlarMenu();
    this.iniciarForm();
  }

  ngAfterViewInit(){
    this.verificarID();
  }

  iniciarForm(){
    this.formDetalheEmpresa = this.formBuilder.group([

    ]);
  }

  buscarTiposQuartos(idempresa){
    this.http.get(this.ser.retornarURL()+"TipoQuarto/ListarTipoQuartosPelaEmpresa?idempresa="+idempresa)
    .subscribe((tipoquartos:any)=>{
      this.tiposQuartos = tipoquartos;
    },
    (error:any)=>{
      this.loading.esconderLoading();
      this.sweet.ExibirMensagemCatch(error);
    },
    () => {
      this.loading.esconderLoading();
    })
  }


  verificarID()
  {
    this.loading.conteudo = "Aguarde enquanto os dados da empresa estão sendo consultados.";
    this.loading.exibirLoading();
    let idempresa = this.route.snapshot.paramMap.get("id");
    this.empresa = this.http.get(this.ser.retornarURL()+"Empresa/BuscarEmpresa?idempresa="+idempresa)
    .subscribe((resultado:any)=>{
      this.empresa = resultado;
      this.buscarTiposQuartos(idempresa);
      console.log(this.tiposQuartos);
    },
    (error:any)=>{
      this.loading.esconderLoading();
      this.sweet.ExibirMensagemCatch(error);
    },
    () => {
      this.loading.esconderLoading();
    })
  }

}

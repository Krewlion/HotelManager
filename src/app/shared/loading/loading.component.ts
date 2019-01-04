import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class Loading implements OnInit {

  servico : LoadingService;

  constructor(public loadingservice:LoadingService) { this.servico = loadingservice }

  ngOnInit() {

  }

  alterarMessagem(conteudo:string){
    this.loadingservice.conteudo = conteudo;
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  imagens:string [] = [];

  constructor() { }

  abrirModal(imagens:string[]){

    let botao = document.getElementById("btnModal") as HTMLButtonElement;
    this.imagens = imagens;
    botao.click();
  }

  fecharModal(){

  }

}

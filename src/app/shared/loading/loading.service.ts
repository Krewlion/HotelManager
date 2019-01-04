import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  conteudo:string = "Aguarde";

  constructor() { }

  private _load: boolean= false;
  public get load(): boolean {
    return this._load;
  }
  public set load(value: boolean) {
    this._load = value;
  }

  exibirLoading(){
    this.load = true;
  }

  esconderLoading(){
    this.load = false;
    this.conteudo = "Aguarde enquanto sua solicitação está sendo realizada."
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { SweetalertService } from 'src/app/shared/servicos/sweetalert.service';
import { Servicos } from 'src/app/shared/servicos/servicos.service';
import { Observable, observable } from 'rxjs';
import { ICidade, IEndereco } from 'src/app/shared/interface/interfaces';

@Injectable({
  providedIn: 'root'
})

export class ReservasServicos{

  cidades:Observable<ICidade[]>;
  exibirLoading = false;
  enderecos:Observable<IEndereco[]>;

  constructor(private http:HttpClient, private sweet:SweetalertService, private ser:Servicos){

  }

  listarCidades(cidade:string){
    this.exibirLoading = true;
    return this.http.get(this.ser.retornarURL()+"Endereco/ListarCidades?cidade="+cidade)
    .pipe(
      map((cidades:ICidade[]) => {
        if(cidades.length > 0){
          this.exibirLoading = false;
          return cidades;
        }
        else{
          this.exibirLoading = false;
          return undefined;
        }
      },
      (error:any) => {
        this.sweet.ExibirMensagemCatch(error);
        return Observable.throw(error.statusText);
      }),
      catchError((err, caught) => {
        console.log('asd');
        this.sweet.ExibirMensagemCatch(err);
        return Observable.throw(err.statusText);
      })

    )
  }

  listarBairros(bairro:string){
    this.exibirLoading = true;
    return this.http.get(this.ser.retornarURL()+"Endereco/ListarMunicipios?bairro="+bairro)
    .pipe(
      map((enderecos:IEndereco[]) => {
        if(enderecos.length > 0){
          this.exibirLoading = false;
          return enderecos;
        }
        else{
          this.exibirLoading = false;
          return undefined;
        }
      },
      (error:any) => {
        this.sweet.ExibirMensagemCatch(error);
        return Observable.throw(error.statusText);
      }),
      catchError((err, caught) => {
        console.log('asd');
        this.sweet.ExibirMensagemCatch(err);
        return Observable.throw(err.statusText);
      })

    )
  }

  listarCidadesSubscribe(cidade:string){
      return this.http.get(this.ser.retornarURL()+"Endereco/ListarCidades?cidade="+cidade);
  }


}

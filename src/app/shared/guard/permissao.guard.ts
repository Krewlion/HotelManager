import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Servicos } from '../servicos/servicos.service';
import { MenuService } from '../../menu/menu.service';
import { ValidadorService } from '../servicos/validador.service';
import { SweetalertService } from '../servicos/sweetalert.service';
import { map } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class PermissaoGuard implements CanActivate {
  constructor(private loading:LoadingService, private sweet:SweetalertService, private router: Router, private validador:ValidadorService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var obs = this.validador.ValidarPermissaoBoolean(route.routeConfig.path);
    this.loading.exibirLoading();
    return obs.pipe(
      map((resultado:any) =>{
          if(resultado.erros != undefined){
            this.sweet.ExibirMensagemPermissao(resultado.erros.join("<br>"));
            this.router.navigate(["home"]);
          }
          else{
          if (Boolean(resultado) === false){
            this.sweet.ExibirMensagemPermissao("Infelizmente seu grupo de usuário não tem permissão a essa tela.<br> Favor entrar em contato com o administrador.");
            this.loading.esconderLoading();
            this.router.navigate(["home"]);
          }
          this.loading.esconderLoading();
          return Boolean(resultado)
        }
      }
      ,
      (error:any) =>{
        this.sweet.ExibirMensagemCatch(error);
        this.loading.esconderLoading();
      }
      )
    );

  }
}

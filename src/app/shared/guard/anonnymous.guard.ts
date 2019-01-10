import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Servicos } from '../servicos/servicos.service';
import { MenuService } from '../../menu/menu.service';
import {Location } from '@angular/common';
import { SweetalertService } from '../servicos/sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class AnonnymousGuard implements CanActivate {
  constructor(private route:ActivatedRoute, private router: Router, private menu:MenuService, private sweet:SweetalertService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.menu.pegarDadosCookie() == undefined) {
      //this.menu.exibirMenu();
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(['']);
    this.sweet.ExibirMensagemAviso("Essa tela só permite o acesso se o usuário estiver deslogado.");
    return false;
  }
}

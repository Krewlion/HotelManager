import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Servicos } from '../servicos/servicos.service';
import { MenuService } from '../../menu/menu.service';
import {Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route:ActivatedRoute, private router: Router, private menu:MenuService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.menu.pegarDadosCookie() != undefined) {
      //this.menu.exibirMenu();
      this.menu.logado = true;
      //this.menu.exibirNomeClienteNoMenu();
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(['usuario/login'], {
      queryParams: {url: state.url}});
    return false;
  }
}

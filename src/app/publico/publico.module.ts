import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { SobreComponent } from './sobre/sobre.component';
import { HoteisComponent } from './hoteis/hoteis.component';
import { SharedModule } from '../shared/shared.module';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CarrinhoService } from './carrinho/carrinho.service';
import { LoginComponent } from './usuario/login/login.component';
import {AccordionModule} from 'primeng/accordion';

import { SobreEmpresaComponent } from './empresa/sobre_empresa/sobre_empresa.component';
import { CadastrarComponent } from './usuario/cadastrar/cadastrar.component';
import { AnonnymousGuard } from '../shared/guard/anonnymous.guard';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    SharedModule,
    RouterModule.forChild([
      {
        path:'home',
        component: HomeComponent
      },
      {
        path:'sobre',
        component: SobreComponent
      },
      {
        path:'hoteis',
        component: HoteisComponent
      }
      ,
      {
        path:'carrinho',
        component:CarrinhoComponent
      }
      ,
      {
        path:'usuario/login',
        component:LoginComponent,
        canActivate:[AnonnymousGuard]
      },
      {
        path:'empresa/sobre/:id',
        component:SobreEmpresaComponent
      }
      ,
      {
        path:'publico/usuario/cadastrar',
        component:CadastrarComponent,
        canActivate:[AnonnymousGuard]
      }
    ])
  ],
  declarations: [HomeComponent, SobreComponent, HoteisComponent, CarrinhoComponent,SobreEmpresaComponent],
  providers:[CarrinhoService]
})
export class PublicoModule { }

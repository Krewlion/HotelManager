import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncluircartaoComponent } from './usuario/incluircartao/incluircartao.component';
import {  RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { MeuperfilComponent } from './usuario/meuperfil/meuperfil.component';
import { PagamentoComponent } from '../privado/usuario/pagamento/pagamento.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path:'privado/usuario/incluircartao',
        component:IncluircartaoComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'privado/usuario/meuperfil',
        component:MeuperfilComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'privado/cliente/pagamento',
        component:PagamentoComponent,
        canActivate:[AuthGuard]
      }
    ])
  ],
  declarations: [IncluircartaoComponent, MeuperfilComponent,PagamentoComponent]
})
export class PrivadoModule { }

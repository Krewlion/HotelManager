import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncluircartaoComponent } from './usuario/incluircartao/incluircartao.component';
import {  RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path:'privado/usuario/incluircartao',
        component:IncluircartaoComponent,
        canActivate:[AuthGuard]
      }
    ])
  ],
  declarations: [IncluircartaoComponent]
})
export class PrivadoModule { }

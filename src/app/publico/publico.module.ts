import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { SobreComponent } from './sobre/sobre.component';
import { HoteisComponent } from './hoteis/hoteis.component';
import { SharedModule } from '../shared/shared.module';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CarrinhoService } from './carrinho/carrinho.service';

@NgModule({
  imports: [
    CommonModule,
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
    ])
  ],
  declarations: [HomeComponent, SobreComponent, HoteisComponent, CarrinhoComponent],
  providers:[CarrinhoService]
})
export class PublicoModule { }

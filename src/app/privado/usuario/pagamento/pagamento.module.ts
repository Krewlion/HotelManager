import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagamentoComponent } from './pagamento.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path:'privado/cliente/pagamento',
        component:PagamentoComponent,
        canActivate:[AuthGuard]
      }
    ])
  ],
  declarations: [PagamentoComponent]
})
export class PagamentoModule {

}

import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import localeFrExtra from '@angular/common/locales/extra/br';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AppComponent } from './app.component';
import { LoginComponent } from './publico/usuario/login/login.component';
import { SharedModule } from './shared/shared.module';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PublicoModule } from './publico/publico.module';
import { HomeComponent } from '../app/publico/home/home.component'
import {Servicos} from '../app/shared/servicos/servicos.service';
import {PagamentoModule} from './privado/usuario/pagamento/pagamento.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CadastrarComponent } from './publico/usuario/cadastrar/cadastrar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PrivadoModule } from './privado/privado.module';


registerLocaleData(localePt, 'pt-BR', localeFrExtra);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    NotfoundComponent,
    CadastrarComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgxDaterangepickerMd,
    SharedModule,
    PagamentoModule,
    PublicoModule,
    PrivadoModule,
    RouterModule
    .forRoot([
      {
        path:'home',
        component:HomeComponent,
      },
      {
        path:'',
        component:HomeComponent,
      },
      {
        path: '**',
        component: NotfoundComponent }
      ]
    ),
    BsDatepickerModule.forRoot(),
  ],
  providers: [Servicos,
  {
    provide: LOCALE_ID, useValue: 'pt-BR'
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

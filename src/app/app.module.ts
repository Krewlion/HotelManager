import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './publico/cliente/login/login.component';
import { SharedModule } from './shared/shared.module';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PublicoModule } from './publico/publico.module';
import { HomeComponent } from '../app/publico/home/home.component'
import {Servicos} from '../app/shared/servicos/servicos.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent
  ],
  imports: [
    FormsModule,
    PublicoModule,
    BrowserModule,
    SharedModule,
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
      ]),
  ],
  providers: [Servicos],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule}  from "@angular/forms";
import { HttpModule } from "@angular/http"
import { Loading } from './loading/loading.component';
import { LoadingService } from './loading/loading.service';
import { CnpjPipe } from './pipe/cnpj.pipe';
import {NgxMaskModule} from 'ngx-mask';
import {CpfPipe} from './pipe/cpf.pipe';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GalleriaModule} from 'primeng/galleria';
import { ImagensComponent } from './imagens/imagens.component';
import { CarouselModule } from 'angular-bootstrap-md';
import {ImagemService} from './imagens/imagem.service';


@NgModule({
  imports: [
    CommonModule,
    GalleriaModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    RouterModule.forRoot([

    ]),
    BrowserModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    Loading,
    CnpjPipe,
    CpfPipe,
    ImagensComponent
    ],
  providers:[
    LoadingService,ImagemService
  ],
  exports:[
    CommonModule,
    GalleriaModule,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    ReactiveFormsModule,
    HttpModule,
    NgxMaskModule,
    Loading,
    CarouselModule,
    CnpjPipe,
    ImagensComponent,
    CpfPipe
  ]

})
export class SharedModule { }

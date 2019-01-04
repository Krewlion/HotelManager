import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { SobreComponent } from './sobre/sobre.component';
import { HoteisComponent } from './hoteis/hoteis.component';
import { SharedModule } from '../shared/shared.module';

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
    ])
  ],
  declarations: [HomeComponent, SobreComponent, HoteisComponent]
})
export class PublicoModule { }

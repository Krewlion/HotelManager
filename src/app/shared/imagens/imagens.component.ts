import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from 'angular-bootstrap-md';
import { ImagemService } from './imagem.service';

@Component({
  selector: 'app-imagens',
  templateUrl: './imagens.component.html',
  styleUrls: ['./imagens.component.css']
})
export class ImagensComponent implements OnInit {

  imagemService:ImagemService;

  constructor(public imagem:ImagemService) { this.imagemService = imagem; }

  ngOnInit() {
  }

}

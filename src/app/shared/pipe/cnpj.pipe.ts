import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpj'
})

export class CnpjPipe implements PipeTransform {

  transform(value: string): any {
    var cnpj = value;
    if (cnpj != undefined){
      return cnpj.substring(0,2)+"."+cnpj.substring(2,5)+"."+cnpj.substring(5,8)+"/"+cnpj.substring(8,12)+"-"+cnpj.substring(12,14);
    }
    else{
      return cnpj;
    }
  }
}

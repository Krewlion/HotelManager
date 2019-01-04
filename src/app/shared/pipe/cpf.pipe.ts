import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})

export class CpfPipe implements PipeTransform {

  transform(value: string): any {
    var cpf = value;
    if (cpf != undefined){
      return cpf.substring(0,3)+"."+cpf.substring(3,6)+"."+cpf.substring(6,9)+"-"+cpf.substring(9,12);
    }
    else{
      return cpf;
    }
  }
}

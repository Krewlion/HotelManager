import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Servicos } from './servicos.service';
import { Http } from '@angular/http';
import { SweetalertService } from './sweetalert.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {

  constructor(private router:Router,  private ser:Servicos, private http:Http, private sweet:SweetalertService) { }

  validarCPF(cpf: string): boolean {

    if (cpf == null) {
        return false;
    }
    if (cpf.length != 11) {
        return false;
    }
    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
        return false;
    }


    let numero = 0;
    let caracter = '';
    const numeros = '0123456789';
    let j = 10;
    let somatorio = 0;
    let resto = 0;
    let digito1 = 0;
    let digito2 = 0;
    let cpfAux = '';
    cpfAux = cpf.substring(0, 9);
    for (let i = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) == -1) {
            return false;
        }
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
        digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
        digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
        return false;
    } else {
        return true;
    }
}

validarCNPJ(cnpj) {

  cnpj = cnpj.replace(/[^\d]+/g,'');

  if(cnpj == '') return false;

  if (cnpj.length != 14)
      return false;

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999")
      return false;

  // Valida DVs
  var tamanho = cnpj.length - 2
  var numeros = cnpj.substring(0,tamanho);
  var digitos = cnpj.substring(tamanho);
  var soma = 0;
  var pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0))
      return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0,tamanho);
  soma = 0;
  pos = tamanho - 7;
  for ( let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1))
        return false;

  return true;

}

validateEmail(email) {
  const em = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return em.test(email);
}

ValidarData(data) {
  if (data != undefined) {
    if (data.length == 10) {
      const RegExPattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
      return RegExPattern.test(data);
    } else {
      return null;
    }
  } else {
    return null;
  }
}

ValidarNumerosDecimais(valor){
  const RegExPattern = /[0-9]+(\.[0-9][0-9]?)?/;
  return RegExPattern.test(valor);
}

 ValidadorData(c:AbstractControl) : {[key:string]:boolean } | null {
   let sweet:SweetalertService;
   let http:Http;
   let ser:Servicos;
   let router: Router;
  let val:ValidadorService = new ValidadorService(router,ser,http,sweet);
  if (val.ValidarData(c.value) || c.value == "" ){
    return null;
  }
    else{
      return {data : true}
    }
  }

  ValidadorCPFCNPJ(c:AbstractControl) : {[key:string]:boolean} |  null{
    let sweet:SweetalertService;
    let http:Http;
    let ser:Servicos;
    let router: Router;
    let val:ValidadorService = new ValidadorService(router, ser,http,sweet);
    if(c.value != undefined || c.value != ""){

        if(c.value.toString().length == 11 || c.value.toString().length == 14){

          if (c.value.toString().length ==11){
            if(val.validarCPF(c.value)){
              return null;
            }
            else{
              return { cpf : true};
            }
          }
          else{
            if (val.validarCNPJ(c.value)){
              return null;
            }
            else{
              return { cpf : true};
            }
          }

        }
        else{
          return { cpf : true};
        }

      }
      else
      {
        return { cpf : true};
      }
    }

  ValidadorCPF(c:AbstractControl) : {[key:string]:boolean} |  null{
    let sweet:SweetalertService;
    let http:Http;
    let ser:Servicos;
    let router: Router;
    let val:ValidadorService = new ValidadorService(router, ser,http,sweet);
    if (val.validarCPF(c.value)){
      return null;
    }
    else{
      return { cpf : true};
    }
  }

  ValidadorCNPJ(c:AbstractControl) : {[key:string]:boolean} |  null{
    let sweet:SweetalertService;
    let http:Http;
    let ser:Servicos;
    let router: Router;
    let val:ValidadorService = new ValidadorService(router, ser,http,sweet);
    if (val.validarCNPJ(c.value)){
      return null;
    }
    else{
      return { cnpj : true};
    }
  }

  ValidadorPorcentagem(c:AbstractControl) : {[key:string]:boolean} |  null{
    if (c.value >= 0 && c.value <= 100){
      return null;
    }
    else{
      return { rangeporcentagem : true};
    }
  }

  mensagensValidacao(){
    return {
      required:"Esse campo é obrigatório.",
      minlength:"O campo precisa ter pelo - 2 caracteres",
      number:"Somente números são permitidos nesse campo",
      decimal:"Números, virgulas e pontos nesse campo",
      postivo:"O número precisa ser maior que 0",
      data:"A data está no formato inválido.",
      cnpj: "O CNPJ não é válido.",
      email:"O e-mail não é válido.",
      cep:"O cep precisa ter 8 caracteres.",
      cpf:"O CPF não é válido",
      nan:"Apenas números permitidos",
      rangeporcentagem:"O valor precisa estar entre 0 e 100.",
      numero:"Apenas números nesse campo.",
      maiorquezero: "Apenas números maiores que 0."
    }
  }

  ValidadorEmail (c:AbstractControl) : {[key:string]:boolean} | null{
    let sweet:SweetalertService;
    let http:Http;
    let ser:Servicos;
    let router: Router;
    let val:ValidadorService = new ValidadorService(router, ser,http,sweet);
    if (val.validateEmail(c.value)){
      return null;
    }
    else{
      return {email:true};
    }
  }

  ValidadorCep (c:AbstractControl) : {[key:string]:boolean} | null{
    if (c.value.toString().length == 8 ){
      return null;
    }
    else{
      return {cep:true};
    }
  }

  ValidadorNumero (c:AbstractControl) : {[key:string]:boolean} | null{
    if (!isNaN(c.value)){
      return null;
    }
    else{
      return {nan:true};
    }
  }

  ValidadorNumeroMaiorQue0 (c:AbstractControl) : {[key:string]:boolean} | null{
    var valor = c.value.replace(",",".");
    if (!isNaN(valor)){
      if (valor > 0){
        return null;
      }
      else{
        return {maiorquezero:true};
      }

    }
    else{
      return {maiorquezero:true};
    }
  }

  setMessage(c:AbstractControl, messagens:any) : string{
    if ((c.touched || c.dirty) && c.errors){
      let ret:string = "";
      Object.keys(c.errors).forEach(element => {
        ret += messagens[element] + '<br>';
      });
      return ret;
    }
  }

  setMessageSemTouchedDirty(c:AbstractControl, messagens:any) : string{
    if (c.errors){
      let ret:string = "";
      Object.keys(c.errors).forEach(element => {
        ret += messagens[element] + '<br>';
      });
      return ret;
    }
  }

  ValidarPermissao(route){
    var permissao = false;
    return this.http.get(this.ser.retornarURL()+"menu/ValidarPermissao?idusuario="+this.ser.pegarDadosCookie().idusuario+"&rota="+route);
  }

  ValidarPermissaoBoolean(route) : Observable<any>{
    var permissao = false;
    return this.http.get(this.ser.retornarURL()+"menu/ValidarPermissao?idusuario="+this.ser.pegarDadosCookie().idusuario+"&rota="+route)
  }


}

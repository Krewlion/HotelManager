import { SafeResourceUrl } from "@angular/platform-browser";

export interface IUsuario {
  loginusuario: string;
  idusuariocripto:string;
  email:string;
  idusuario: number;
  interval:number;
  cpf:string;
  nomeusuario:string;
  token:any
  datanascimento:string;
  cartoes:any[];
  reservas:any[]
}

export interface IErro {
  erros:string[];
  inner:string[];
}

export interface IBase64{
  idarquivocontrato:number;
  idarquivoservico:number;
  idarquivosolicitacao:number;
  nome:string;
  base64:SafeResourceUrl
}

export interface ICidade{
  cdCidade:number;
  dsCidadeNome:string;
}

export interface IEndereco{
  cdcidade:number;
  cdbairro:number;
  cidade:string;
  bairro:string;
  cep:string;
  endereco:string;
}

export interface ICarrinho{
  nomehotel:string;
  datainicial:string;
  datafinal:string;
  valor:number;
  diarias:number;
  idquarto:number;
}


export interface ICartao{
  cvv:string;
  datavencimento:string;
  nomecartao:string;
  idusuario:number;
  idusuariocartao:number;
  numerocartao:string;
}

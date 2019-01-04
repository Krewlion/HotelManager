import { SafeResourceUrl } from "@angular/platform-browser";

export interface IUsuario {
  loginusuario: string;
  email:string;
  idusuario: number;
  interval:number;
  cpf:string;
  nome:string;
  token:any
}

export interface IErro {
  erros:string[];
  inner:string[];
}

export interface IAtividade{
  idatividadepreparacao:number;
  idservico:number;
  duracao:number;
  recurso:string;
  idespecialidade:number;
  especialidade:string;
  obs:string;
}

export interface IServico{
  idservico:number;
  tag:string;
  os:string;
  equipamento:string;
  documentogerador:string;
  solicitante:string;
  local:string;
  descricao:string;
  disciplina:string;
  responsavel:string;
  datainclusao:string;
  etapa:string;
  situacaoescopo:string;
  apoiosstr:string;
  inspecoesstr:string;
  porcentagemtotal:string;
}

export interface IAtividadeOficina{
   idatividadeoficina:number;
   idservico:number;
   duracaooficina:number;
   recursooficina:string;
   ferramentaoficina:string;
   obsoficina:string;
 }

 export interface IAtividadeDetalhamento{
  idatividadetalhamento:number;
  idservico:number;
  idatividadedetalhamento:number;
  duracaodetalhamento:number;
  recursodetalhamento:string;
  idespecialidadedetalhamento:number;
  especialidadedetalhamento:string;
  obsdetalhamento:string;
}

export interface IDetalhamentoMateriais{
  iddetalhamentomaterial:number;
  idservico:number;
  descricaodetalhamentomaterial:string;
  unidade:string;
  quantidade:number;
  aplicacao:string;
  idprioridade:number;
  prioridade:string;
}

export interface IPlanoContingecia {
  idplanocontigencia:number;
  idservico:number;
  idclassificacao:number;
  descricaoplanocontigencia:string;
  idimpacto:number;
  acao:string;
  classificacao:string;
  impacto:string;
}

export interface IEspecialidade{
  idespecialidade:number;
  especialidade:string;
}

export interface IPrioridade{
  idprioridade:number;
  prioridade:string;
}

export interface IClassificacao{
  idclassificacao:number;
  classificacao:string;
}

export interface IImpacto{
  idimpacto:number;
  impacto:string;
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

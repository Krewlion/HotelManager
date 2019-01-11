import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidadorService } from 'src/app/shared/servicos/validador.service';
import { SweetalertService } from 'src/app/shared/servicos/sweetalert.service';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { Servicos } from 'src/app/shared/servicos/servicos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  form:FormGroup;
  formBuilder: FormBuilder = new FormBuilder();

  grupos:any[] = [];
  Clientes:any[]= [];
  listaContratos:any[]= [];
  tipoDocs:any[] = [];

  erroCpf:string = "";
  erroNome:string = "";
  erroLogin:string = "";
  erroData:string = "";
  erroSenha:string = "";
  erroEmail:string = "";;
  erroIdGrupo:string  = "";
  query:string = undefined;

  constructor
    (
      private validador:ValidadorService,
      private sweet:SweetalertService,
      private http:HttpClient,
      private loading:LoadingService,
      private ser:Servicos,
      private router:Router,
      private route:ActivatedRoute
    ) { }

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get("url")){
      this.query = this.route.snapshot.queryParamMap.get("url");
    }
    this.iniciarForm();
  }

  ngAfterViewInit(){
    this.iniciarValidadores();
  }

  iniciarForm(){
    this.form = this.formBuilder.group({
      nomeusuario:["",Validators.required],
      cpf :["",[Validators.required, this.validador.ValidadorCPF]],
      loginusuario:["",Validators.required],
      email:["",[Validators.required, this.validador.ValidadorEmail]],
      datanascimento:["",[Validators.required, this.validador.ValidadorData]],
      senha:["",Validators.required],
      idusuariologado:[0]
    });
  }

  iniciarValidadores(){

    const cpfControl = this.form.get("cpf");
    cpfControl.valueChanges
    .pipe(
      debounceTime(1000)
    )
    .subscribe(cpf =>{
      this.erroCpf = this.validador.setMessage(cpfControl,this.validador.mensagensValidacao());
    });

    const nomeControl = this.form.get("nomeusuario");
    nomeControl.valueChanges
    .pipe(
      debounceTime(1000)
    )
    .subscribe(nome =>{
      this.erroNome = this.validador.setMessage(nomeControl,this.validador.mensagensValidacao());
    });

    const loginControl = this.form.get("loginusuario");
    loginControl.valueChanges
    .pipe(
      debounceTime(1000)
    )
    .subscribe(login =>{
      this.erroLogin = this.validador.setMessage(loginControl,this.validador.mensagensValidacao());
    });

    const dataControl = this.form.get("datanascimento");
    dataControl.valueChanges
    .pipe(
      debounceTime(1000)
    )
    .subscribe(data =>{
      this.erroData = this.validador.setMessage(dataControl,this.validador.mensagensValidacao());
    });

    const emailControl = this.form.get("email");
    emailControl.valueChanges
    .pipe(
      debounceTime(1000)
    )
    .subscribe(email =>{
      this.erroEmail = this.validador.setMessage(emailControl,this.validador.mensagensValidacao());
    });

  }

  voltar(){
    this.router.navigate([""]);
  }

  incluirUsuario(){
    this.loading.conteudo = "Aguarde enquanto seu cadastro estão sendo realizado.";
    this.loading.exibirLoading();
    this.http.post(this.ser.retornarURL()+"Usuario/IncluirUsuario", this.form.value)
    .subscribe((resultado:any)=>{
      if (resultado.erros == undefined) {
        this.sweet.ExibirMensagemSucesso("O seu cadastro foi realizado com sucesso");
        if (this.query == undefined){
          this.router.navigate([""]);
        }
        else{
          this.router.navigate(["usuario/login"], {
            queryParams: {url: this.query}});
        }
      }
      else{
        this.sweet.ExibirMensagemErro(resultado.erros.join("<br>"));
        this.loading.esconderLoading();
      }
    },
    (error:any)=>{
      this.sweet.ExibirMensagemCatch(error);
      this.loading.esconderLoading();
    },
    ()=>{
      this.loading.esconderLoading();
    });
  }

}

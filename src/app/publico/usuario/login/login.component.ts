import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SweetalertService } from '../../../shared/servicos/sweetalert.service';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { IUsuario } from 'src/app/shared/interface/interfaces';
import { Servicos } from 'src/app/shared/servicos/servicos.service';
import { MenuService } from 'src/app/menu/menu.service';


@Component({
  selector:'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string;
  senha: string;
  query:string = undefined;
  form:FormGroup;
  builder:FormBuilder = new FormBuilder();
  constructor
  (
    private sweet:SweetalertService,
    private router: Router,
    private route:ActivatedRoute,
    private http:HttpClient,
    private loading:LoadingService,
    private ser:Servicos,
    private menu:MenuService,
  )
  {}

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get("url")){
      this.query = this.route.snapshot.queryParamMap.get("url");
    }
    this.form = this.builder.group({
      loginusuario:["",Validators.required],
      senha:["",Validators.required]
    });

    // const usuariologado = this.ser.pegarDadosCookie();
    // if (usuariologado != undefined) {
    //   this.messagingService.pedirPermissao(this.ser.pegarDadosCookie().idusuario);
    //   this.router.navigate(['/servico/consultar']);
    // } else {
    //   this.menu.ocultarMenu();
    //   this.menu.limparTemporizador();
    // }
  }

  Cadastrar(){
    this.router.navigate(['publico/usuario/cadastrar'], {
      queryParams: {url: "privado/cliente/pagamento"}});
  }

  Entrar() {
     const dados = this.ser.pegarDadosCookie();
     if (dados != undefined) {
       this.sweet.ExibirMensagemErro('Foi realizado apenas o redireciamento para pagina inicial, já que a sessão foi aberta para o usuário ' + dados.loginusuario + ' (provavelmente em outra aba deste navegador).');
       this.router.navigate(['']);
    } else {

     const usuario: IUsuario = <IUsuario>{};
     this.loading.exibirLoading();
     this.http.post(this.ser.retornarURL()+"Login/Logar", this.form.value).subscribe((result:any)=>{

            if(result == undefined){
              this.sweet.ExibirMensagemErro("Falha no login. Informe o administrador do sistema.");
            }
            else{
              if (result.erros == undefined){
              usuario.idusuariocripto = result.idusuariocripto;
              //usuario.interval = this.menu.iniciarContador(this.menu.tempoSesssao, this.router);
              usuario.loginusuario = result.nomeusuario;
              usuario.token = result.token;
              //this.messagingService.pedirPermissao(usuario.idusuario);
              this.ser.abrirCookie(usuario, this.router, this.query);
              this.menu.exibirNomeUsuarioMenu();
            }
            else{
              //this.erros = result;
              this.sweet.ExibirMensagemErro(result.erros.join("<br>"));
              this.loading.esconderLoading();
            }
          }
    }
    ,(error:any) =>{
      this.loading.esconderLoading();
      this.sweet.ExibirMensagemCatch(error);
    },
    () => {
      this.loading.esconderLoading();
    });
  }
}
  keyUp(key:any){
    if (key.key == "Enter"){
      this.Entrar();
    }
}

}

import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { Profesor } from '../Profesor/profesor.model';
import { LonginServicioService } from './longin-servicio.service';
import { DataBaseService } from '../servicios/data-base.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user={
    usuario:'',
    clave:''
  };
  
  usr='';
  psw='';

  // profesor={
  //   id:'',
  //   nombre:'',
  //   apellidos:'',
  //   domicilio:'',
  //   email:'',
  //   fono:'',
  //   usuario:'',
  //   clave:''
  // };

  public listaProfesor: Profesor[] = [];
  private Profesor: Profesor;
  
  loginService: LonginServicioService;
  dbService: DataBaseService;
  campo: string;

  constructor(private router: Router,private toastController: ToastController,
    private loginServices: LonginServicioService, 
    private dbServices:DataBaseService,
    private activateRoute: ActivatedRoute) {
      this.loginService=this.loginServices;
      this.dbService=this.dbServices;

  }
      

  ngOnInit() {
    this.listaProfesor=this.loginService.getProfesores();    
  }

  ingresar(){
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
   
    if(this.validateModel(this.user))
      {
        this.dbServices.getDatabaseState().subscribe(rdy => {
          if (rdy) {
            this.dbServices.getUsuario(this.user.usuario, this.user.clave).then(rs => {
              this.Profesor = rs;
              this.usr=this.Profesor.usuario;
              this.psw=this.Profesor.clave;
            });
          }
        });
        if(this.usr===this.user.usuario && this.psw === this.user.clave){
        
          this.router.navigate(['/principal/', this.user.usuario], navigationExtras);
        }             
           
        else
        {
          this.presentToast('Usuario o password no validos');
        }     
      }
    else
    {
      this.presentToast('Falta completar: '+this.campo);
    }

  }

  recuperar(){
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
   
    if(this.validateUsuario(this.user)){
      //this.usuarioServiceS=this.usuarioService.getUsuario(this.user.usuario);
      // if(this.usuarioService.getUsuario(this.user.usuario).usuario === this.user.usuario){
      //   this.router.navigate(['/recuperar/', this.user.usuario], navigationExtras);
      // }else{
      //   this.presentToast('Nombre de usuario no valido');
      // }
    }
    else
    {
      this.presentToast('Nombre de Usuario no puede estar Vacio');
    }

  } 
  async presentToast(message: string, duration?: number){
    const toast = await this.toastController.create(
      {
        message,
        duration:duration?duration:2000
      }
    );
    toast.present();
  }
  validateModel(model: any){
    
    for (const [key, value] of Object.entries(model)) {
      
      if (value==='') {
        
        this.campo=key;
        
        return false;
      }
    }
    return true;
  }

  validateUsuario(NombreUsuario: any){

    if (NombreUsuario===''){
      return false;
    }
    return true;
  }

  volver(){
    this.router.navigate(['/home']);
  }
}

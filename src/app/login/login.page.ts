import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from '../usuarios/usuarios.model';
import { UsuarioService } from '../usuarios/usuarios.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user={
    usuario:'',
    password:''
  };
  usuarioServiceS: Usuario;
  campo: string;

  constructor(private router: Router,private toastController: ToastController,
   private usuarioService: UsuarioService) { }

  ngOnInit() {
  }
  ingresar(){
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    if(this.validateModel(this.user)){
      this.usuarioServiceS=this.usuarioService.getUsuario(this.user.usuario);
      if(this.usuarioService.getUsuario(this.user.usuario).password === this.user.password){
        this.router.navigate(['/principal'],navigationExtras); // navegamos hacia el Home y enviamos información adicional
      }else{
        this.presentToast('Usuario o password no validos');
      }
    }
    else
    {
      this.presentToast('Falta completar: '+this.campo);
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
}

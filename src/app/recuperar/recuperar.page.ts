import { Component, OnInit } from '@angular/core';
import { Usuario} from '../usuarios/usuarios.model';
import { UsuarioService} from '../usuarios/usuarios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  usuario: Usuario;

  constructor(private activateRoute: ActivatedRoute, 
    private UsuarioService: UsuarioService) { }

  ngOnInit(){this.activateRoute.paramMap.subscribe(
    paramMap=>{     
       const idContactoRecibido=paramMap.get('NombreUsuario');
      this.usuario=this.UsuarioService.getUsuario(idContactoRecibido);
      console.log(idContactoRecibido);
    }
  );
  }

}

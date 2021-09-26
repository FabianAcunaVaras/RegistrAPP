import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario} from '../usuarios/usuarios.model';
import { UsuarioService} from '../usuarios/usuarios.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuario: Usuario;

  constructor(private activateRoute: ActivatedRoute, 
    private UsuarioService: UsuarioService) { }

  ngOnInit() {this.activateRoute.paramMap.subscribe(
    paramMap=>{
      const idContactoRecibido=paramMap.get('NombreUsuario');
      this.usuario=this.UsuarioService.getUsuario(idContactoRecibido);
    }
  );
  }

}

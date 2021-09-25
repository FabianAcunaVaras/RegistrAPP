import { Injectable } from '@angular/core';
import { Usuario } from './usuarios.model';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listaUsuario: Usuario[]=[
    {
      nombre: 'Cristian',
      apellidos:'Tapia',
      usuario: 'ctapia',
      password: '4928'
    },
];
  constructor() {
  }
  getUsuario(usuarioInput: string)
  {
    return {
            ...this.listaUsuario.find(usuario => {return usuario.usuario === usuarioInput })
           }
    }
  // addUsuario(nombre: string, apellidos: string, usuario: string, password: string)
  // {
    
  // }
}
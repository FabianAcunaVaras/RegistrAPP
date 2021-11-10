import { Injectable } from '@angular/core';
import { Profesor } from '../Profesor/profesor.model';
import { DataBaseService } from '../servicios/data-base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LonginServicioService {

  public listaProfesor: Profesor[] = [];
  profesor: Profesor;
  db: DataBaseService;

  constructor(db: DataBaseService) {
    this.db=db;
   }
  
  getDabaseState()
  {
    return this.db.getDatabaseState();
  }

  getProfesores()
  {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getProfesores().subscribe(Profesor => {
          this.listaProfesor = Profesor;
        });
      }
    });
    return this.listaProfesor;
  }

  getUsuarioClave(usuario:string, clave: string): Promise<Profesor>
  {
      return this.db.getUsuario(usuario,clave).then(data => {
          this.profesor = data;
          return this.profesor;
       });
   }
}

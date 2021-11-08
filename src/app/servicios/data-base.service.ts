import { Platform, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  private dbReady = new BehaviorSubject<boolean>(false);
  private dataBase: SQLiteObject;
  private http: HttpClient;
  private  sqlPorter: SQLitePorter;
  private sqlite: SQLite;

  constructor( http: HttpClient,plataforma: Platform,sqlite: SQLite, sqlPorter: SQLitePorter) 
  { 
    plataforma.ready()
    .then(() => {
      this.sqlite=sqlite;
      this.http=http;
      this.sqlPorter=sqlPorter;
      this.sqlite.create({
        name: 'DataBaseRegistrAPP.db',
        location: 'default',
        createFromLocation: 1
      })
      .then((db: SQLiteObject) => {
        this.dataBase = db;
        this.crearTablas();
      }).catch(e =>{
        alert('Error conexión'  );
        console.error(e);
        console.error('Error Conexión '+ e.message);
      });
    }).catch(e => alert('Plataforma no leida.'));
  }
  crearTablas() {
    // Obtener el archivo que contiene las sentencias SQL
  this.http.get('../assets/db/RegistrApp.sql',{responseType: 'text'})
      .subscribe(sql => {
        // Ejecutar las sentencias SQL del archivo
        this.sqlPorter.importSqlToDb(this.dataBase, sql)
          .then(async _ => {
            // Informar que la base de datos está lista
            //.cargarContactos();
            this.dbReady.next(true);            
          }).catch(e => {
            alert('Error al importar la base de datos');
            console.error(e);
            console.error('Error al importar la base de datos', e.message);
          });
      });
    }
    getDatabaseState() {
      return this.dbReady.asObservable();
    }

    // getContactos(): Observable<Contacto[]>{
    //   return this.listaContactos.asObservable();
    // }
    // cargarContactos(){
    //   return this.dataBase.executeSql('SELECT * FROM contacto', []).then(data => {
    //     let contactos: Contacto[] = [];
  
    //     if (data.rows.length > 0) {
    //       for (var i = 0; i < data.rows.length; i++) {
    //           contactos.push(
    //             data.rows.item(i));
    //       }
    //     }
    //     this.listaContactos.next(contactos);
    //   });
    // }
}

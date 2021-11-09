import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginAlumnosPageRoutingModule } from './login-alumnos-routing.module';

import { LoginAlumnosPage } from './login-alumnos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginAlumnosPageRoutingModule
  ],
  declarations: [LoginAlumnosPage]
})
export class LoginAlumnosPageModule {}

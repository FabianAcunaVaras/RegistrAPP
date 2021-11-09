import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginAlumnosPage } from './login-alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: LoginAlumnosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginAlumnosPageRoutingModule {}

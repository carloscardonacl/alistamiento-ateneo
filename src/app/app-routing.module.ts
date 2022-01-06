import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';
import { TableroComponent } from './tablero/tablero.component';
import { LoginComponent } from './login/login.component';

import { AlistamientocrearComponent } from './alistamientocrear/alistamientocrear.component';


import { ErrorComponent } from './error/error.component';


export const routes: Routes = [
  { 
    path : 'tablero', component : AdminComponent,
    children:[{path : '', component : TableroComponent, canActivate:[AuthGuard]}]
  },
  { 
    path : 'alistamientocrear/:id/:tipo', component : AdminComponent,
    children:[{path : '', component : AlistamientocrearComponent, canActivate:[AuthGuard]}]
  },
 
  { path : 'login', component: LoginComponent },
  { path : '' , redirectTo:'login', pathMatch:'full' },
  { path : 'error', component : ErrorComponent  },
  { path : '**', redirectTo:'/error' },
];

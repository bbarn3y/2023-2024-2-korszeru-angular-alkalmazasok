import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LobbyComponent} from "./lobby/lobby.component";
import {publicGuard} from "./_guards/public.guard";
import {privateChildGuard, privateGuard} from "./_guards/private.guard";

const routes: Routes = [
  {
    path: 'lobby',
    component: LobbyComponent,
    canActivate: [privateGuard],
    canActivateChild: [privateChildGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [publicGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

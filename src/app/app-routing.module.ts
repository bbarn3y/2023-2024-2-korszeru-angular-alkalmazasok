import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {publicGuard} from "./_guards/public.guard";
import {privateChildGuard, privateGuard} from "./_guards/private.guard";

const routes: Routes = [
  {
    path: 'lobby',
    loadChildren: () => import('./inner/inner.module').then((m) => m.InnerModule),
    canActivate: [privateGuard],
    canActivateChild: [privateChildGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
    canActivate: [publicGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
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

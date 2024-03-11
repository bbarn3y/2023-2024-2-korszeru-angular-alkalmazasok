import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {LoginComponent} from "../login/login.component";
import {NotFoundComponent} from "../not-found/not-found.component";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {ClientService} from "../_services/client.service";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

const zorroModules = [
  NzButtonModule,
  NzCardModule,
  NzFormModule,
  NzInputModule
];

@NgModule({
  declarations: [
    LoginComponent,
    NotFoundComponent,
  ],
  imports: [
    ...zorroModules,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ClientService
  ]
})
export class AuthenticationModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NotFoundComponent } from './not-found/not-found.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const zorroModules = [
  NzButtonModule,
  NzCardModule,
  NzFormModule,
  NzInputModule

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    ...zorroModules,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

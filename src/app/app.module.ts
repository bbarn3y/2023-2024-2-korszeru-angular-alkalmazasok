import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NzCardModule } from 'ng-zorro-antd/card';

const zorroModules = [
  NzCardModule
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    ...zorroModules,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

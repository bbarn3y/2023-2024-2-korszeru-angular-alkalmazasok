import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CookieService} from "ngx-cookie-service";
import { CharacterNamePipe } from './_pipes/character-name.pipe';
import { SelectedCharacterDirective } from './_directives/selected-character.directive';

const zorroModules = [
  NzButtonModule,
  NzCardModule,
  NzFormModule,
  NzInputModule
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...zorroModules,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [
    CookieService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

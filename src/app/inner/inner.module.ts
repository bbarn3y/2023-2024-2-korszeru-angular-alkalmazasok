import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {LobbyComponent} from "../lobby/lobby.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {NzModalModule} from "ng-zorro-antd/modal";
import {CharacterCreatorComponent} from "../character-creator/character-creator.component";

const routes: Routes = [
  {
    path: '',
    component: LobbyComponent
  },
  {
    path: '**',
    redirectTo: '/lobby'
  }
];

const zorroModules = [
  NzButtonModule,
  NzCardModule,
  NzFormModule,
  NzInputModule,
  NzModalModule
];

@NgModule({
  declarations: [
    CharacterCreatorComponent,
    LobbyComponent
  ],
  imports: [
    ...zorroModules,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class InnerModule { }

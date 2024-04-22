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
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {CharacterListingComponent} from "../character-listing/character-listing.component";
import {CharacterCardComponent} from "../character-card/character-card.component";
import {NzIconModule} from "ng-zorro-antd/icon";
import { IconDefinition } from '@ant-design/icons-angular';
import { AimOutline, DeleteOutline, EditOutline, ForkOutline, SelectOutline, WomanOutline } from '@ant-design/icons-angular/icons';
import {CharacterNamePipe} from "../_pipes/character-name.pipe";
import {SelectedCharacterDirective} from "../_directives/selected-character.directive";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {KonvaComponent} from "../konva/konva.component";

const icons: IconDefinition[] = [ AimOutline, DeleteOutline, EditOutline, ForkOutline, SelectOutline, WomanOutline ];

const zorroModules = [
  NzButtonModule,
  NzCardModule,
  NzFormModule,
  NzIconModule.forChild(icons),
  NzInputModule,
  NzInputNumberModule,
  NzModalModule,
  NzPopconfirmModule,
  NzSelectModule
];

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

@NgModule({
  declarations: [
    CharacterCreatorComponent,
    CharacterListingComponent,
    CharacterCardComponent,
    CharacterNamePipe,
    KonvaComponent,
    SelectedCharacterDirective,
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

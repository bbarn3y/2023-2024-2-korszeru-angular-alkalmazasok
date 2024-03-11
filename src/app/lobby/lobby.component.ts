import { Component } from '@angular/core';
import {UserService} from "../_services/user.service";
import {RoutingService} from "../_services/routing.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {CharacterCreatorComponent} from "../character-creator/character-creator.component";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.less']
})
export class LobbyComponent {
  constructor(private modalService: NzModalService,
              private routingService: RoutingService,
              private userService: UserService) {
  }

  logout() {
    this.userService.removeSession();
    this.routingService.routeToLogin();
  }

  openCharacterCreator() {
    this.modalService.create({
      nzTitle: 'Character creator',
      nzContent: CharacterCreatorComponent,
      nzFooter: null
    });
  }
}

import { CanActivateFn } from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {RoutingService} from "../_services/routing.service";
import {UserService} from "../_services/user.service";

@Injectable({
  providedIn: 'root'
})
export class PublicGuardService {
  constructor(private routingService: RoutingService,
              private userService: UserService) {}

  canActivate(): boolean {
    if (this.userService.isLoggedIn) {
      this.routingService.routeToLobby();
    }
    return !this.userService.isLoggedIn;
  }

}

export const publicGuard: CanActivateFn = (route, state) => {
  return inject(PublicGuardService).canActivate();
};

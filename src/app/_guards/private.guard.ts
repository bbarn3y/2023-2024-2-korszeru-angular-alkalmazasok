import {CanActivateChildFn, CanActivateFn} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {RoutingService} from "../_services/routing.service";
import {UserService} from "../_services/user.service";

@Injectable({
  providedIn: 'root'
})
export class PrivateGuardService {
  constructor(private routingService: RoutingService,
              private userService: UserService) {}

  canActivate(): boolean {
    if (!this.userService.isLoggedIn) {
      this.routingService.routeToLogin();
    }
    return this.userService.isLoggedIn;
  }

}


export const privateGuard: CanActivateFn = (route, state) => {
  return inject(PrivateGuardService).canActivate();
};

export const privateChildGuard: CanActivateChildFn = (route, state) => {
  return inject(PrivateGuardService).canActivate();
};

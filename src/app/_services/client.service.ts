import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, map, Observable, of} from "rxjs";
import {UserService} from "./user.service";
import {ConfigurationService} from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,
              private userService: UserService) { }

  login(): Observable<{ token: string }> {
    if (ConfigurationService.config.useHttp) {
      return this.http.get<{ token: string }>('https://mocki.io/v1/4b986d28-e3c8-4b39-90ca-80cec8d7d01d')
        .pipe(map((response) => {
          this.userService.saveSession(response.token);
          return response;
        }));
    } else {
      return of({
        token: 'dsfdfg3dsa'
      }).pipe(
        delay(1000),
        map((response) => {
          this.userService.saveSession(response.token);
          return response;
        })
      );
    }
  }
}

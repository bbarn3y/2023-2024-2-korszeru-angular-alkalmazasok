import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ClientService} from "../_services/client.service";
import {RoutingService} from "../_services/routing.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private clientService: ClientService,
              private fb: FormBuilder,
              private http: HttpClient,
              private routingService: RoutingService) {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.clientService.login()
        .subscribe((response) => {
          console.log('login response', response);
          this.routingService.routeToLobby();
        });
    } else {
      this.loginForm.markAsDirty();
      this.loginForm.updateValueAndValidity();
      Object.values(this.loginForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity();
      })
    }
  }

}

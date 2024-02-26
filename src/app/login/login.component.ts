import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient) {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.http.get('https://mocki.io/v1/4b986d28-e3c8-4b39-90ca-80cec8d7d01d')
        .subscribe((response) => {
          console.log('login response', response);
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

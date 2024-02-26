import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.valid) {

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

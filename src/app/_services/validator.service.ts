import { Injectable } from '@angular/core';
import {Form, FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  fullNameValidator = (control: FormControl): { [k: string]: boolean } | null => {
    if (control.value &&
      control.value.trim().split(' ').length !== 2) {
      return {
        invalidFullName: true
      }
    } else {
      return null;
    }
  }

  // @todo Group validator

}

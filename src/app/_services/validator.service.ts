import { Injectable } from '@angular/core';
import {Form, FormControl, FormGroup} from "@angular/forms";

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

  maxHpByClassValidator = (group: FormGroup): { [k: string]: boolean } | null => {
    const characterClass = group.get('characterClass')?.value;
    const maxHp = group.get('maxHp')?.value;
    if (characterClass && maxHp) {
      // @todo
    } else {
      return null;
    }
  }

}

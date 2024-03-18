import { Injectable } from '@angular/core';
import {Form, FormControl, FormGroup} from "@angular/forms";
import {CharacterClass, CharacterDetails} from "@models/character";

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
    const characterClass: CharacterClass = group.get('characterClass')?.value;
    const maxHp = group.get('maxHp')?.value;
    if (characterClass && maxHp) {
      if (maxHp > CharacterDetails[characterClass].maxHp) {
        return {
          invalidMaxHpForClass: true
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

}

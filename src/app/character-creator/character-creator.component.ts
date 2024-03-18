import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorService} from "../_services/validator.service";

@Component({
  selector: 'app-character-creator',
  templateUrl: './character-creator.component.html',
  styleUrls: ['./character-creator.component.less']
})
export class CharacterCreatorComponent {
  characterForm: FormGroup;

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService) {
    this.characterForm = fb.group({
      name: ['', [Validators.required, this.validatorService.fullNameValidator]],
      image: ['', [Validators.required]],
      characterClass: ['', [Validators.required]],
      maxHp: [1, [Validators.required, Validators.min(1), Validators.max(12)]]
    }, {
      validators: []
    });
  }

  createCharacter() {

  }


}

import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorService} from "../_services/validator.service";
import {Character, CharacterClass} from "@models/character";
import {CharacterService} from "../_services/character.service";

@Component({
  selector: 'app-character-creator',
  templateUrl: './character-creator.component.html',
  styleUrls: ['./character-creator.component.less']
})
export class CharacterCreatorComponent {
  characterForm: FormGroup;

  CharacterClass = CharacterClass;

  constructor(private characterService: CharacterService,
              private fb: FormBuilder,
              private validatorService: ValidatorService) {

    this.characterForm = fb.group({
      name: ['', [Validators.required, this.validatorService.fullNameValidator]],
      image: ['', [Validators.required]],
      characterClass: [CharacterClass.MAGE, [Validators.required]],
      maxHp: [1, [Validators.required, Validators.min(1), Validators.max(12)]]
    }, {
      validators: [
        this.validatorService.maxHpByClassValidator
      ]
    });
  }

  createCharacter() {
    const character = new Character(
      this.characterForm.get('name')?.value,
      this.characterForm.get('image')?.value,
      this.characterForm.get('characterClass')?.value,
      this.characterForm.get('maxHp')?.value,
    );
    this.characterService.addCharacter(character);
  }


}

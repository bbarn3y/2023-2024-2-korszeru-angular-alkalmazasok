import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Character} from "@models/character";
import {CharacterService} from "../_services/character.service";
import {CharacterCreatorComponent} from "../character-creator/character-creator.component";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.less']
})
export class CharacterCardComponent {
  @Input() character!: Character;

  @Output() characterSelected: EventEmitter<Character> = new EventEmitter<Character>();

  constructor(public characterService: CharacterService,
              private modalService: NzModalService) {}

  editCharacter(character: Character) {
    this.modalService.create({
      nzTitle: `Edit ${character.name}`,
      nzContent: CharacterCreatorComponent,
      nzData: {
        character
      },
      nzFooter: null
    });
  }


}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Character} from "@models/character";
import {CharacterService} from "../_services/character.service";

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.less']
})
export class CharacterCardComponent {
  @Input() character!: Character;

  @Output() characterSelected: EventEmitter<Character> = new EventEmitter<Character>();

  constructor(public characterService: CharacterService) {}


}

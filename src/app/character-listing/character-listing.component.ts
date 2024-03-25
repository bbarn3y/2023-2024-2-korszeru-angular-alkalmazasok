import {Component, OnInit} from '@angular/core';
import {Character, CharacterDetails} from "@models/character";
import {CharacterService} from "../_services/character.service";

@Component({
  selector: 'app-character-listing',
  templateUrl: './character-listing.component.html',
  styleUrls: ['./character-listing.component.less']
})
export class CharacterListingComponent implements OnInit {
  characters: Character[] = [];
  selectedCharacter?: Character;

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.characters = this.characterService.getCharacters();
  }

  protected readonly CharacterDetails = CharacterDetails;
}

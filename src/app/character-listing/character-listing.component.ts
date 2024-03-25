import {Component, OnInit} from '@angular/core';
import {Character} from "@models/character";
import {CharacterService} from "../_services/character.service";

@Component({
  selector: 'app-character-listing',
  templateUrl: './character-listing.component.html',
  styleUrls: ['./character-listing.component.less']
})
export class CharacterListingComponent implements OnInit {
  characters: Character[] = [];

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.characters = this.characterService.getCharacters();
  }

}

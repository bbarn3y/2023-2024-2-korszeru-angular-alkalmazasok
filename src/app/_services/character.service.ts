import { Injectable } from '@angular/core';
import {Character} from "@models/character";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor() { }

  addCharacter(character: Character): void {

  }

  editCharacter(id: string, character: Character): void {

  }

  getCharacters(): Character[] {
    // @todo
    return [];
  }

  removeCharacter(id: string) {

  }

  private saveCharacters(characters: Character[]): void {

  }


}

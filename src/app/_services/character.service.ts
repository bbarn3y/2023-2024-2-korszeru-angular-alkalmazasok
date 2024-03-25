import { Injectable } from '@angular/core';
import {Character} from "@models/character";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  characterStorageKey = 'characters';

  constructor() {}

  addCharacter(character: Character): void {
    const updatedCharacters = [...this.getCharacters(), character];
    this.saveCharacters(updatedCharacters);
  }

  editCharacter(id: string, character: Character): void {
    const characterToModify = this.getCharacters().find(c => c.id === id);
    if (characterToModify) {
      this.saveCharacters(
        this.getCharacters().map(c => c.id === id ? {...character, id} : c)
      );
    }
  }

  getCharacters(): Character[] {
    const charactersString = localStorage.getItem(this.characterStorageKey);
    return charactersString
      ? (JSON.parse(charactersString) as [])
      : [];
  }

  removeCharacter(id: string): void {
    const filteredCharacters = this.getCharacters().filter(c => c.id !== id);
    this.saveCharacters(filteredCharacters);
  }

  private saveCharacters(characters: Character[]): void {
    localStorage.setItem(this.characterStorageKey, JSON.stringify(characters));
  }

}

export class Character {
  id: string;
  name: string;
  image: string;
  characterClass: CharacterClass;
  maxHp: number;

  constructor(name: string, image: string, characterClass: CharacterClass, maxHp: number) {
    this.id = Math.random().toString(36).substring(7);
    this.name = name;
    this.image = image;
    this.characterClass = characterClass;
    this.maxHp = maxHp;
  }
}

export enum CharacterClass {
  MAGE = 'MAGE',
  ROGUE = 'ROGUE',
  WARRIOR = 'WARRIOR'
}

export interface CharacterDetail {
  maxHp: number;
}

export const CharacterDetails: { [k in CharacterClass]: CharacterDetail } = {
  [CharacterClass.MAGE]: {
    maxHp: 6
  },
  [CharacterClass.ROGUE]: {
    maxHp: 8
  },
  [CharacterClass.WARRIOR]: {
    maxHp: 12
  },
}


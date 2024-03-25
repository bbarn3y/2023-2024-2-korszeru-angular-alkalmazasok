import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'characterName'
})
export class CharacterNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value + 'X';
  }

}

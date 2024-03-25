import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'characterName'
})
export class CharacterNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (value && value.split(' ').length === 2) {
      const split = value.split(' ');
      return `${split[1]}, ${split[0]}`;
    }
    return value;
  }

}

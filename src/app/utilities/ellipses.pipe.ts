import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipses'
})
export class EllipsesPipe implements PipeTransform {

  transform(value: any, maxLength?: number): any {
    let shortenedString;
    if (value.length > maxLength) {
      shortenedString = value.substr(0, maxLength);
      let lastCharacter = shortenedString.substr(shortenedString.length - 1, 1);

      for (let i = maxLength; lastCharacter !== ' '; i--) {
        shortenedString = value.substr(0, i);
        lastCharacter = shortenedString.substr(shortenedString.length - 1, 1);
      }

      shortenedString += '...';
    }
    return shortenedString || value;
  }

}

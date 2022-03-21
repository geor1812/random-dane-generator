import { Injectable } from '@nestjs/common';
import { streetNameEnding } from './constants/street-name.constant';

@Injectable()
export class PersonService {
  private streetNameMaxLength = 25;
  private streetNameMinLength = 8;

  /**
   * Generates a random string used as a street name. Length varies between 8 and 25 characters.
   * @returns generated street name.
   */
  generateStreetName(): string {
    // get street name length
    const streetNameLength =
      Math.floor(
        Math.random() *
          (this.streetNameMaxLength - this.streetNameMinLength + 1),
      ) + this.streetNameMinLength;

    const ending =
      streetNameEnding[Math.floor(Math.random() * streetNameEnding.length)];
    let streetName = '';
    for (let i = 0; i < streetNameLength; i++) {
      const num = Math.floor(Math.random() * 25 + 1) + 97;
      streetName += String.fromCharCode(num);
    }
    // if word is long(15+), possibly add a space. About 30% chance for that
    if (streetNameLength > 15 && Math.random() >= 0.666) {
      streetName =
        streetName.substring(0, streetNameLength / 2) +
        ' ' +
        streetName.substring(streetNameLength / 2 + 1);
    }
    // capitalize the first letter
    streetName = streetName.replace(streetName[0], streetName[0].toUpperCase());
    // remove characters to ensure that the name is less or equal 25 chars even with the ending
    streetName = streetName.substring(0, streetName.length - ending.length);
    // add the street name ending
    streetName += ending;
    return streetName;
  }
}

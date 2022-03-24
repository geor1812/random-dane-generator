import { Injectable } from '@nestjs/common';
import { streetNameEnding } from './constants/street-name.constant';
import { IAddress } from './person.interface';

@Injectable()
export class PersonService {
  private streetNameMaxLength = 25;
  private streetNameMinLength = 8;
  private streetAddressMaxNumber = 999;

  /**
   * Generate an Address object.
   * @returns generated address.
   */
  generateAddress(): IAddress {
    return {
      street: this.generateStreetName(),
      number: this.generateAddressNumber(),
      floor: this.generateFloorNumber(),
      door: this.generateDoorNumber(),
      postalCode: {
        code: '2300',
        town: 'København S',
      },
    };
  }

  /**
   * Generate a random string used as a street name. Length varies between 8 and 25 characters.
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

  /**
   * Generate a random string representing the street address number.
   * @returns a number from 1 to 999 optionally followed by an uppercase letter (e.g., 43B).
   */
  generateAddressNumber(): string {
    let addressNumber = Math.floor(
      Math.random() * this.streetAddressMaxNumber + 1,
    ).toString();
    // Add a uppercase letter at the end of the number. About 30% chance for that
    if (Math.random() >= 0.666) {
      addressNumber += String.fromCharCode(Math.floor(Math.random() * 25) + 65);
    }
    return addressNumber;
  }

  /**
   * Generate a floor number.
   * @returns either “st” or a number from 1 to 99.
   */
  generateFloorNumber(): string {
    let floor = 'st';
    // Make the floor number something other than st. About 30% chance for that
    if (Math.random() >= 0.666) {
      floor = Math.floor(Math.random() * 99 + 1).toString();
    }
    return floor;
  }

  /**
   * Generate a door number.
   * @returns either “th”, “mf”, “tv”, a number from 1 to 50, or something like “d-14”.
   */
  generateDoorNumber(): string {
    switch (Math.floor(Math.random() * 5)) {
      case 0:
        return 'th';
      case 1:
        return 'mf';
      case 2:
        return 'tv';
      case 3:
        return (Math.floor(Math.random() * 50) + 1).toString();
      case 4:
        let doorNumber = '404';
        // get the starting character
        doorNumber = String.fromCharCode(Math.floor(Math.random() * 25) + 97);
        // Add a dash in the middle becasue you're quirky like that. About 30% chance for that
        if (Math.random() >= 0.666) {
          doorNumber += '-';
        }
        // Add the 1-3 digits at the back
        return (doorNumber += (Math.floor(Math.random() * 333) + 1).toString());
      default:
        return '404';
    }
  }
}

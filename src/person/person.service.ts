import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertValuesMissingError, Repository } from 'typeorm';
import { streetNameEnding } from './constants/street-name.constant';
import { phoneNumberPrefix } from './constants/phone-number.constant';
import { IAddress } from './person.interface';
import { IPerson, Gender } from './person.interface';
import { PostalCode } from './postal-code.entity';
import * as data from '../assets/person-name.json';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PostalCode)
    private postalCodeRepository: Repository<PostalCode>,
  ) {}

  private streetNameMaxLength = 25;
  private streetNameMinLength = 8;
  private streetAddressMaxNumber = 999;

  //function generate person
  generateIPerson(IAddress): IPerson {
    return {
      name: 'Moby',
      surname: 'Dick',
      gender: 'male',
      cpr: '13113452',
      phone: '32642665',
      birthday: '121254',
      address: IAddress,
    };
  }

  getPersonBaseInfo(): {
    name: string;
    surname: string;
    gender: Gender;
  } {
    const randomPerson =
      data.persons[Math.floor(Math.random() * data.persons.length)];
    return {
      name: randomPerson.name,
      surname: randomPerson.surname,
      gender: randomPerson.gender as Gender,
    };
  }

  //generate Cpr where: days:00-28, months: 01-12 & years: 00-99
  generateCpr(gender: Gender = 'female'): string {
    let Cpr_1 = '';
    let temp_1 = Math.floor(Math.random() * 28) + 1;
    const zero = '0';
    if (temp_1 < 10) {
      Cpr_1 = temp_1.toString();
      Cpr_1 = zero.concat(Cpr_1);
    }
    let Cpr_2 = '';
    let temp_2 = Math.floor(Math.random() * (12 - 1) + 1);
    if (temp_2 < 10) {
      Cpr_2 = temp_2.toString();
      Cpr_2 = zero.concat(Cpr_2);
    }
    let Cpr_3 = '';
    let temp_3 = Math.floor(Math.random() * 99) + 1;
    if (temp_3 < 10) {
      Cpr_3 = temp_3.toString();
      Cpr_3 = zero.concat(Cpr_3);
    }
    //last 4 digits: odd for male, even for female
    if (gender === 'male') {
      Cpr_3 += Math.floor(Math.random() * 9999) * 2 + 1;
    } else {
      return (Cpr_3 += Math.floor(Math.random() * 9999) * 2);
    }
  }

  //generate birthday by removing the last 4 digits a cpr call
  generateBirthday(cpr: string = null): string {
    const Cpr = cpr ? cpr : this.generateCpr();
    let birthday = Cpr.substring(0, 6);
    return birthday;
  }

  //generate phone number based on prefixes of various length
  generatePhone(): string {
    const prefix =
      phoneNumberPrefix[Math.floor(Math.random() * phoneNumberPrefix.length)];
    let ending = '';
    if (prefix.length == 1) {
      ending = (Math.floor(Math.random() * 9999999) + 1).toString();
    } else if (prefix.length == 2) {
      ending = (Math.floor(Math.random() * 999999) + 1).toString();
    } else {
      ending = (Math.floor(Math.random() * 99999) + 1).toString();
      let phoneNumber = prefix.concat(ending.toString());
      return phoneNumber;
    }
  }

  findAll(): Promise<PostalCode[]> {
    return this.postalCodeRepository.find();
  }

  findOne(code: string): Promise<PostalCode> {
    return this.postalCodeRepository.findOne(code);
  }

  async findRandom(): Promise<PostalCode> {
    const randCodesArr = await this.postalCodeRepository
      .createQueryBuilder()
      .select('*')
      .from(PostalCode, 'postal_code')
      .orderBy('RAND()')
      .limit(1)
      .execute();
    return {
      code: randCodesArr[0].cPostalCode,
      town: randCodesArr[0].cTownName,
    };
  }

  /**
   * Generate an Address object.
   * @returns generated address.
   */
  async generateAddress(): Promise<IAddress> {
    return {
      street: this.generateStreetName(),
      number: this.generateAddressNumber(),
      floor: this.generateFloorNumber(),
      door: this.generateDoorNumber(),
      postalCode: await this.findRandom(),
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

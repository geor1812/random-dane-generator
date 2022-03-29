import { Controller, Get, Query } from '@nestjs/common';
import { Gender, IAddress, IPerson } from './person.interface';
import { PersonService } from './person.service';

@Controller()
export class PersonController {
  constructor(private personService: PersonService) {}
  //COMMENT FOR EMPTY PUSH
  @Get('cpr')
  getCpr(): { cpr: string } {
    return {
      cpr: this.personService.generateCpr(),
    };
  }

  @Get('name-gender')
  getNameGender(): { name: string; surname: string; gender: Gender } {
    return this.personService.getPersonBaseInfo();
  }

  @Get('name-gender-birthday')
  getNameGenderBirthday(): {
    name: string;
    surname: string;
    gender: Gender;
    birthday: string;
  } {
    const baseInfo = this.personService.getPersonBaseInfo();
    const birthday = this.personService.generateBirthday();

    return {
      name: baseInfo.name,
      surname: baseInfo.surname,
      gender: baseInfo.gender,
      birthday,
    };
  }

  @Get('cpr-name-gender')
  getCprNameGender(): {
    name: string;
    surname: string;
    gender: Gender;
    cpr: string;
  } {
    const baseInfo = this.personService.getPersonBaseInfo();
    const cpr = this.personService.generateCpr(baseInfo.gender);

    return {
      name: baseInfo.name,
      surname: baseInfo.surname,
      gender: baseInfo.gender,
      cpr,
    };
  }

  @Get('cpr-name-gender-birthday')
  getCprNameGenderBirthday(): {
    name: string;
    surname: string;
    gender: Gender;
    cpr: string;
    birthday: string;
  } {
    const baseInfo = this.personService.getPersonBaseInfo();
    const cpr = this.personService.generateCpr(baseInfo.gender);
    const birthday = this.personService.generateBirthday(cpr);
    return {
      name: baseInfo.name,
      surname: baseInfo.surname,
      gender: baseInfo.gender,
      cpr,
      birthday,
    };
  }

  @Get('address')
  async getAddress(): Promise<{
    address: IAddress;
  }> {
    return {
      address: await this.personService.generateAddress(),
    };
  }

  @Get('phone')
  getPhone(): {
    phone: string;
  } {
    return {
      phone: this.personService.generatePhone(),
    };
  }

  @Get('person')
  async getPeople(
    @Query('amount') amount: number,
  ): Promise<IPerson | IPerson[]> {
    let result;
    if (amount === undefined) {
      result = await this.personService.generatePerson();
    } else if (amount >= 1 && amount <= 100) {
      result = [];
      for (let i = 0; i < amount; i++) {
        const person = await this.personService.generatePerson();
        result.push(person);
      }
    } else {
      result = { message: 'Invalid amount' };
    }
    return result;
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { Gender, IAddress, IPerson } from './person.interface';
import { PersonService } from './person.service';

@Controller()
export class PersonController {
  constructor(private personService: PersonService) {}

  /**
   * VERY IMPORTANT! Mock data probably doesn't reflect the data service will return
   */
  @Get('cpr')
  getCpr(): { cpr: string } {
    return {
      cpr: '170596-2616',
    };
  }

  @Get('name-gender')
  getNameGender(): { name: string; surname: string; gender: Gender } {
    return { name: 'Testy', surname: 'McTest', gender: 'male' };
  }

  @Get('name-gender-birthday')
  getNameGenderBirthday(): {
    name: string;
    surname: string;
    gender: Gender;
    birthday: string;
  } {
    return {
      name: 'Testina',
      surname: 'McTest',
      gender: 'female',
      birthday: '17-03-95',
    };
  }

  @Get('cpr-name-gender')
  getCprNameGender(): {
    name: string;
    surname: string;
    gender: Gender;
    cpr: string;
  } {
    return {
      name: 'Some',
      surname: 'Guy',
      gender: 'male',
      cpr: '170596-2616',
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
    return {
      name: 'Some',
      surname: 'Girl',
      gender: 'female',
      cpr: '220500-2617',
      birthday: '22-05-2000',
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
      phone: '+4571559090',
    };
  }

  @Get('person')
  async getPeople(
    @Query('amount') amount: number,
  ): Promise<IPerson | IPerson[]> {
    const people = [
      {
        name: 'Christina',
        surname: 'McChrist',
        gender: 'female',
        cpr: '051299-8080',
        birthday: '05-12-1999',
        address: await this.personService.generateAddress(),
        phone: '+4577339988',
      },
      {
        name: 'John',
        surname: 'Bobz',
        gender: 'male',
        cpr: '111191-8181',
        birthday: '11-11-1991',
        address: await this.personService.generateAddress(),
        phone: '+4531339099',
      },
    ] as IPerson[];

    return amount > 1 ? people : people[0];
  }
}

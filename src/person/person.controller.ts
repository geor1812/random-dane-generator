import { Controller, Get } from '@nestjs/common';
import { IPerson, IBaseInfo } from './person.interface';
@Controller()
export class PersonController {
  constructor() {}

  @Get('cpr')
  getCpr(): { cpr: string } {
    return {
      cpr: '170596-2616',
    };
  }

  @Get('name-gender')
  getNameGender(): { baseInfo: IBaseInfo } {
    return { baseInfo: { name: 'Testy', surname: 'McTest', gender: 'male' } };
  }

  @Get('name-gender-birthday')
  getNameGenderBirthday(): {
    baseInfo: IBaseInfo;
    birthday: string;
  } {
    return {
      baseInfo: {
        name: 'Testina',
        surname: 'McTest',
        gender: 'female',
      },
      birthday: '17-03-95',
    };
  }

  @Get('cpr-name-gender')
  getCprNameGender(): {
    baseInfo: IBaseInfo;
    cpr: string;
  } {
    return {
      baseInfo: {
        name: 'Some',
        surname: 'Guy',
        gender: 'male',
      },
      cpr: '170596-2616',
    };
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from '../../ormconfig';
import { PersonService } from './person.service';
import { PostalCode } from './postal-code.entity';

let service: PersonService;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    // declare the database connection
    imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: config.default.host,
        port: config.default.port,
        username: config.default.user,
        password: config.default.password,
        database: config.default.schema,
        entities: [PostalCode],
        synchronize: true,
        dropSchema: false,
        keepConnectionAlive: true,
      }),
      TypeOrmModule.forFeature([PostalCode]),
    ],
    providers: [PersonService],
  }).compile();
  service = module.get<PersonService>(PersonService);
});

//TEST SUITE FOR SIMPLE PERSON SERVICE UNIT TESTS
describe('Person service unit tests', () => {
  //RANDOM PHONE NUMBER
  it('should return a random phone number that is a 8-char string', async () => {
    const randomPhoneNum = service.generatePhone();
    expect(randomPhoneNum).toHaveLength(8);
  });

  it('should return a random phone number that is not null', () => {
    const randomPhoneNum = service.generatePhone();
    expect(randomPhoneNum).toBeDefined();
  });

  it('should generate a random phone number of type string', () => {
    const randomPhoneNum = service.generatePhone();
    expect(typeof randomPhoneNum).toEqual('string');
  });

  //RANDOM CPR NUMBER
  it('should return a random CPR number that is a 10-char string', async () => {
    const randomCPRNum = service.generateCpr();
    expect(randomCPRNum).toHaveLength(10);
  });

  it('should return a random CPR number that is not null', () => {
    const randomCPRNum = service.generateCpr();
    expect(randomCPRNum).toBeDefined();
  });

  it('should generate a random CPR number of type string', () => {
    const randomCPRNum = service.generateCpr();
    expect(typeof randomCPRNum).toEqual('string');
  });

  //RANDOM STREET NAME TESTS
  it('should return a random street name that is not null', () => {
    const randomStreetName = service.generateStreetName();
    expect(randomStreetName).toBeDefined();
  });

  it('should generate a random street name of type string', () => {
    const randomStreetName = service.generateStreetName();
    expect(typeof randomStreetName).toEqual('string');
  });

  it('should call generate a random street name of length higher than 7 chars', () => {
    const randomStreetName = service.generateStreetName();
    expect(randomStreetName.length).toBeGreaterThan(7);
  });

  it('should call generate a random street name of length higher or equal to 8 chars', () => {
    const randomStreetName = service.generateStreetName();
    expect(randomStreetName.length).toBeGreaterThanOrEqual(8);
  });

  it('should call generate a random street name of length less or equal to 25 chars', () => {
    const randomStreetName = service.generateStreetName();
    expect(randomStreetName.length).toBeLessThanOrEqual(25);
  });

  it('should call generate a random street name of length not higher than 26 chars', () => {
    const randomStreetName = service.generateStreetName();
    expect(randomStreetName.length).toBeLessThan(26);
  });

  //RANDOM ADDRESS NUMBERS TESTS
  it('should generate a random address number which is not null', () => {
    const randomAddressNum = service.generateAddressNumber();
    expect(randomAddressNum).toBeDefined();
  });

  it('should generate a random address number of type string', () => {
    const randomAddressNum = service.generateAddressNumber();
    expect(typeof randomAddressNum).toEqual('string');
  });

  //--  WE CANNOT HAVE NEGATION ASSERTS IN JEST, WHICH DOESN'T
  //DOESN'T ALLOW US TO IMPLEMENT ALL TEST CASES AND MAKES IT REPETITIVE --
  it('should generate a random address number which consists of a number not a zero and not a negative', () => {
    const randomAddressNum = service.generateAddressNumber();
    const numPart = parseInt(randomAddressNum.replace(/[^0-9-]/g, ''));
    expect(numPart).toBeGreaterThan(0);
  });

  it('should generate a random address number which consists of a number equal to or higher than one', () => {
    const randomAddressNum = service.generateAddressNumber();
    const numPart = parseInt(randomAddressNum.replace(/[^0-9-]/g, ''));
    expect(numPart).toBeGreaterThanOrEqual(1);
  });

  it('should generate a random address number which consists of a number equal to or lower than nine hundred ninety nine', () => {
    const randomAddressNum = service.generateAddressNumber();
    const numPart = parseInt(randomAddressNum.replace(/[^0-9-]/g, ''));
    expect(numPart).toBeLessThanOrEqual(999);
  });

  it('should generate a random address number which consists of a number not higher than one thousand', () => {
    const randomAddressNum = service.generateAddressNumber();
    const numPart = parseInt(randomAddressNum.replace(/[^0-9-]/g, ''));
    expect(numPart).toBeLessThan(1000);
  });

  //RANDOM FLOOR NUMBER GENERATION TESTS
  it('should generate a random floor number which is not null', () => {
    const randomFloor = service.generateFloorNumber();
    expect(randomFloor).toBeDefined();
  });

  it('should generate a random floor number of type string', () => {
    const randomFloor = service.generateFloorNumber();
    expect(typeof randomFloor).toEqual('string');
  });

  //RANDOM DOOR NUMBER GENERATION TESTS
  it('should generate a random door number which is not null', () => {
    const randomDoorNum = service.generateDoorNumber();
    expect(randomDoorNum).toBeDefined();
  });

  it('should generate a random door number of type string', () => {
    const randomDoorNum = service.generateDoorNumber();
    expect(typeof randomDoorNum).toEqual('string');
  });
});

// *-----------------------------------------------------------------------------------------------------------------* //
//TEST SUITE FOR PERSON SERVICE INTEGRATION TESTS FOR POSTAL CODE
//ESTABLISHING A DATABASE CONNECTION
describe('Person service integration tests for postal code', () => {
  //RANDOM POSTAL CODE TESTS - DATABASE CONNECTION, INTEGRATION TESTS
  it('should call findRandom method which returns a random post code which is not null', async () => {
    const findData = await service.findRandom();
    expect(findData).toBeDefined();
  });

  it('should call findRandom method which returns a random post code with according properties', async () => {
    const findData = await service.findRandom();
    expect(findData).toHaveProperty('code');
    expect(findData).toHaveProperty('town');
  });

  it('should call findRandom method and check typeof properties', async () => {
    const findData = await service.findRandom();
    expect(typeof findData.code).toEqual('string');
    expect(typeof findData.town).toEqual('string');
  });

  it('should call findRandom method and check if code is a 4-char string', async () => {
    const findData = await service.findRandom();
    const zipCode = findData.code;
    expect(zipCode.length).toBe(4);
  });

  it('should call findRandom method and check if code is a 4-digit number', async () => {
    const findData = await service.findRandom();
    const codeNum = parseInt(findData.code);
    expect(codeNum).toBeGreaterThanOrEqual(1000);
    expect(codeNum).toBeLessThanOrEqual(9999);
  });
});

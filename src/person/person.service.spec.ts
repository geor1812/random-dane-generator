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

  //RANDOM STREET NAME TESTS
  it('should return a random street name that is not null', () => {
    const randomStreetName = service.generateStreetName();
    expect(randomStreetName).toBeDefined();
  });

  it('should generate a random street name of type string', () => {
    const randomStreetName = service.generateStreetName();
    expect(typeof randomStreetName).toEqual('string');
  });

  it('should call generate a random street name of length between 8 and 25 chars', () => {
    const randomStreetName = service.generateStreetName();
    expect(randomStreetName.length).toBeGreaterThanOrEqual(8);
    expect(randomStreetName.length).toBeLessThanOrEqual(25);
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

  it('should generate a random address number which consists of a number between 1 and 999', () => {
    const randomAddressNum = service.generateAddressNumber();
    const numPart = parseInt(randomAddressNum.replace(/[^0-9]/g, ''));
    expect(numPart).toBeGreaterThanOrEqual(1);
    expect(numPart).toBeLessThanOrEqual(999);
  });

  //RANDOM FLOOR NUMBER GENERATION TESTS
  it('should generate a random floor number which is not null', () => {
    const randomFloor = service.generateFloorNumber();
    expect(randomFloor).toBeDefined();
  });

  it('should generate a random floor number of type string', () => {
    const randomFloor = service.generateFloorNumber();
    expect(typeof (randomFloor)).toEqual('string');
  });

  //RANDOM DOOR NUMBER GENERATION TESTS
  it('should generate a random door number which is not null', () => {
    const randomDoorNum = service.generateDoorNumber();
    expect(randomDoorNum).toBeDefined();
  });

  it('should generate a random door number of type string', () => {
    const randomDoorNum = service.generateDoorNumber();
    expect(typeof (randomDoorNum)).toEqual('string');
  });

});


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
    expect(typeof (findData.code)).toEqual('string');
    expect(typeof (findData.town)).toEqual('string');
  });

  it('should call findRandom method and check if code is a 4-digit number', async () => {
    const findData = await service.findRandom();
    const codeNum = parseInt(findData.code);
    expect(codeNum).toBeGreaterThanOrEqual(1000);
    expect(codeNum).toBeLessThanOrEqual(9999);
  });

});
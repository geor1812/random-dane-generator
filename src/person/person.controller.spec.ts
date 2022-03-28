import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PersonController } from './person.controller';
import { IPerson } from './person.interface';
import { PersonService } from './person.service';
import { PostalCode } from './postal-code.entity';

let controller: PersonController;
const mockPostalCodeRepo = {
  createQueryBuilder: jest.fn(() => ({
    select: jest.fn(() => ({
      from: jest.fn(() => ({
        orderBy: jest.fn(() => ({
          limit: jest.fn(() => ({
            execute: jest.fn().mockResolvedValue([
              {
                cPostalCode: '1234',
                cTownName:
                  'Taumatawhakatangihangakoauauotamateapokaiwhenuakitanatahu',
              },
            ]),
          })),
        })),
      })),
    })),
  })),
};

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    // declare the database connection
    imports: [],
    providers: [
      PersonService,
      {
        provide: getRepositoryToken(PostalCode),
        useValue: mockPostalCodeRepo,
      },
    ],
    controllers: [PersonController],
  })
    .overrideProvider(getRepositoryToken(PostalCode))
    .useValue(mockPostalCodeRepo)
    .compile();
  controller = module.get<PersonController>(PersonController);
});

describe('Person Controller integration tests ', () => {
  it('should return a list of person objects with length 10', async () => {
    const personList = await controller.getPeople(10);
    expect(personList).toHaveLength(10);
    expect(personList[0]).toBeDefined();
    expect(personList[0]).toHaveProperty('cpr');
    expect(personList[0]).toHaveProperty('name');
    expect(personList[0]).toHaveProperty('gender');
    expect(personList[0]).toHaveProperty('birthday');
    expect(personList[0]).toHaveProperty('address');
    expect(personList[0].address).toHaveProperty('street');
    expect(personList[0].address).toHaveProperty('floor');
    expect(personList[0].address).toHaveProperty('door');
    expect(personList[0].address).toHaveProperty('postalCode');
    expect(personList[0].address.postalCode).toHaveProperty('code');
    expect(personList[0].address.postalCode).toHaveProperty('town');
  });

  it('should return an invalid message response when called with amount = -2', async () => {
    const response = await controller.getPeople(-2);
    expect(response).toStrictEqual({ message: 'Invalid amount' });
  });

  it('should return an invalid message response when called with amount = -1', async () => {
    const response = await controller.getPeople(-1);
    expect(response).toStrictEqual({ message: 'Invalid amount' });
  });

  it('should return an invalid message response when called with amount = 0', async () => {
    const response = await controller.getPeople(0);
    expect(response).toStrictEqual({ message: 'Invalid amount' });
  });

  it('should return a list with 1 element when called with amount = 1', async () => {
    const personList = await controller.getPeople(1);
    expect(personList).toHaveLength(1);
  });

  it('should return a list with 2 elements when called with amount = 2', async () => {
    const personList = await controller.getPeople(2);
    expect(personList).toHaveLength(2);
  });

  it('should return a list with 50 elements when called with amount = 50', async () => {
    const personList = await controller.getPeople(50);
    expect(personList).toHaveLength(50);
  });

  it('should return a list with 99 elements when called with amount = 99', async () => {
    const personList = await controller.getPeople(99);
    expect(personList).toHaveLength(99);
  });

  it('should return a list with 100 elements when called with amount = 100', async () => {
    const personList = await controller.getPeople(100);
    expect(personList).toHaveLength(100);
  });

  it('should return an invalid message response when called with amount = 101', async () => {
    const response = await controller.getPeople(101);
    expect(response).toStrictEqual({ message: 'Invalid amount' });
  });

  it('should return a person object when called with amount = undefined', async () => {
    const person = <IPerson>await controller.getPeople(undefined);
    expect(person).toBeDefined();
    expect(person).toHaveProperty('cpr');
    expect(person).toHaveProperty('name');
    expect(person).toHaveProperty('gender');
    expect(person).toHaveProperty('birthday');
    expect(person).toHaveProperty('address');
    expect(person.address).toHaveProperty('street');
    expect(person.address).toHaveProperty('floor');
    expect(person.address).toHaveProperty('door');
    expect(person.address).toHaveProperty('postalCode');
    expect(person.address.postalCode).toHaveProperty('code');
    expect(person.address.postalCode).toHaveProperty('town');
  });
});

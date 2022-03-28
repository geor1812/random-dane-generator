import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from '../../ormconfig';
import { PersonService } from './person.service';
import { PostalCode } from './postal-code.entity';

describe('Person service', () => {
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

  it('should generate a random street name of type string', () => {
    const randomStreetName = service.generateStreetName();
    expect(typeof randomStreetName).toEqual('string');
  });

  it('should call generate a random street name of length between 8 and 25 chars', () => {
    const randomStreetName = service.generateStreetName();
    expect(randomStreetName.length).toBeGreaterThanOrEqual(8);
    expect(randomStreetName.length).toBeLessThanOrEqual(25);
  });

  it('should call findRandom method which returns a random post code', async () => {
    const findData = await service.findRandom();
    expect(findData).toHaveProperty('code');
    expect(findData).toHaveProperty('town');
  });

  it('should call findRandom method which returns a random post code', async () => {
    const findData = await service.findRandom();
    expect(findData).toHaveProperty('code');
    expect(findData).toHaveProperty('town');
  });
});

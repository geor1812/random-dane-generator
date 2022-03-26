import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from "./person.service";

describe('Person service', () => {
    let service: PersonService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PersonService]
        }).compile();
        service = module.get<PersonService>(PersonService);
    });

    it('should generate a random street name of type string', () => {
        const randomStreetName = service.generateStreetName()
        expect(typeof (randomStreetName)).toEqual('string');
    });

    it('should call generate a random street name of length between 8 and 25 chars', () => {
        const randomStreetName = service.generateStreetName()
        expect(randomStreetName.length).toBeGreaterThanOrEqual(8);
        expect(randomStreetName.length).toBeLessThanOrEqual(25);
    });
});
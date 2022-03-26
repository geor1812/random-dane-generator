import { PostalCodeService } from "./postal-code.service";
import { Test, TestingModule } from '@nestjs/testing';

describe('Postal code service', () => {
    let service: PostalCodeService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostalCodeService]
        }).compile();
        service = module.get<PostalCodeService>(PostalCodeService);
    });

    /* it('should call findRandom method which returns a random post code', async () => {
        const findData = await service.findRandom();
        expect(findData).toHaveProperty('code');
        expect(findData).toHaveProperty('town');
    }); */
});
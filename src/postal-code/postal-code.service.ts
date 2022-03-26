import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomBytes } from "crypto";
import { Repository } from "typeorm";
import { PostalCode } from "./postal-code.entity";

@Injectable()
export class PostalCodeService {

    constructor(
        @InjectRepository(PostalCode)
        private postalCodeRepository: Repository<PostalCode>
    ){}

    findAll(): Promise<PostalCode[]> {
        return this.postalCodeRepository.find();
    }

    findOne(code: string): Promise<PostalCode> {
        return this.postalCodeRepository.findOne(code);
    }

    async findRandom(): Promise<PostalCode> {
        const randCodesArr = await this.postalCodeRepository
            .createQueryBuilder()
            .select("*")
            .from(PostalCode, "postal_code")
            .orderBy("RAND()")
            .limit(1)
            .execute();
        return { 
            code: randCodesArr[0].cPostalCode,
            town: randCodesArr[0].cTownName
        };
    }
}
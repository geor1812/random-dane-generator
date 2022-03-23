import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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

    //STILL IN PROGRESS...
    findRandom(): Promise<PostalCode> {
        return null;
    }
}
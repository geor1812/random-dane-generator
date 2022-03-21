import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostalCodeController } from "./postal-code.controller";

import { PostalCode } from "./postal-code.entity";
import { PostalCodeService } from "./postal-code.service";

@Module({
    imports:[TypeOrmModule.forFeature([PostalCode])],
    providers:[PostalCodeService],
    controllers:[PostalCodeController]
})
export class PostalCodeModule{}
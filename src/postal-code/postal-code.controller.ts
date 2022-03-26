import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { PostalCodeService } from "./postal-code.service";

@Controller('postalCode')
export class PostalCodeController {

    constructor(private readonly postalCodeService: PostalCodeService){}

    @Get()
    async findRandomly(@Res() response) {
        const randomPostalCode = await this.postalCodeService.findRandom();
        return response.status(HttpStatus.OK).json({
            randomPostalCode
        })
    }

    @Get('/all')
    async fetchAll(@Res() response) {
        const postalCodes = await this.postalCodeService.findAll();
        return response.status(HttpStatus.OK).json({
            postalCodes
        })
    }

    @Get('/:code')
    async findById(@Res() response, @Param('code') code) {
        const postalCode = await this.postalCodeService.findOne(code);
        return response.status(HttpStatus.OK).json({
            postalCode
        })
    } 
}
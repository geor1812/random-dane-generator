import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { PostalCodeService } from "./postal-code.service";

@Controller('postalCodes')
export class PostalCodeController {
    constructor(private readonly postalCodeService: PostalCodeService){}

    @Get()
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
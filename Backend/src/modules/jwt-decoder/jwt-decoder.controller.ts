import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { JwtDecoderService } from './jwt-decoder.service'; // Adjust the import path accordingly

@Controller('jwt-decoder')
export class JwtDecoderController {
    constructor(private readonly jwtDecoderService: JwtDecoderService) {}

    @Post()
    postjwt(@Body() body: { token: string }) {
        const { token } = body;

        if (!token) {
            throw new BadRequestException('Token is required');
        }
        const decodedToken = this.jwtDecoderService.decodeToken(token);
        return decodedToken;
    }
}
import { Body, Controller, HttpStatus, Inject, Post, Response } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';
import { SignInDto } from '../dto/sign-in-dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { AuthService } from '../services/auth.service';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        @Inject(AuthService)
        private readonly authService: AuthService,

        private readonly configService: ConfigService
    ) { }

    @ApiOperation({ summary: 'Sign in' })
    @Post('signin')
    async signin(
        @Response() res: ExpressResponse,
        @Body() payload: SignInDto
    ) {
        try {
            const { token } = await this.authService.signIn(payload);

            const expirationTime = +this.configService.get<number>('JWT_COOKIE_EXPIRES_IN');

            res.cookie(this.configService.get('JWT_COOKIE_NAME'), token, {
                httpOnly: true,
                expires: new Date(Date.now() + expirationTime),
            })

            return res.status(HttpStatus.OK).send({ token });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    @ApiOperation({ summary: 'Sign up' })
    @Post('signup')
    async signup(
        @Body() payload: SignUpDto
    ) {
        return this.authService.signUp(payload);
    }
}

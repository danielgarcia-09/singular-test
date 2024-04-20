import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import { SignInDto } from '../dto/sign-in-dto';
import { SignUpDto } from '../dto/sign-up.dto';

@Injectable()
export class AuthService {

    constructor(
        @Inject(UserService)
        private readonly userService: UserService,

        @Inject(JwtService)
        private readonly jwtService: JwtService,
    ) { }

    async signIn(payload: SignInDto) {

        const { email, password } = payload;

        const user = await this.userService.findByEmail(email);

        if (!user || !user.isPasswordValid(password)) {
            throw new UnauthorizedException('User not found');
        }

        const token = this.jwtService.sign({
            id: user.id,
            email: user.email
        });

        return { token }
    }

    async signUp(payload: SignUpDto) {
        const userExists = await this.userService.findByEmail(payload.email);

        if (userExists) {
            throw new UnauthorizedException('User already exists');
        }

        await this.userService.create(payload);

        return { message: 'User created' }
    }
}

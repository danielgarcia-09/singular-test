import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConfig } from "src/config";
import { UserService } from "src/user/services/user.service";
import { JwtPayload } from "../interfaces/auth.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor( 
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWTFromCookie,
                ExtractJwt.fromAuthHeaderAsBearerToken(),            
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    private static extractJWTFromCookie(req: Request) {
        if (!req || !req.cookies) {
            return null;
        }

        return req.cookies[jwtConfig.cookieName] || null;
    }

    async validate(payload: JwtPayload) {        
        const { id, email } = payload;

        const user = await this.userService.findOne({
            where: { id, email }
        })

        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }

        return user;
    }
}

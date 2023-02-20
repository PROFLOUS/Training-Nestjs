import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
    id: string;
    email: string;
    role: string
};



@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    
    constructor() {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        });
    }
    
    async validate(payload: JwtPayload) {
        console.log('payload', payload);
        return payload;
    }
}
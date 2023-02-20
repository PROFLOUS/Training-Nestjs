import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {

        if(info && info.name === 'TokenExpiredError') {
            throw new UnauthorizedException('Token expired');
        }
        if(info && info.name === 'JsonWebTokenError') {
            throw new UnauthorizedException('Invalid token');
        }
        return user;
    }
}
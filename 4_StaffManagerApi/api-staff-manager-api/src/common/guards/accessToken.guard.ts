import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';


@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
      }
    handleRequest(err, user, info) {

        if(info && info.name === 'TokenExpiredError') {
            throw new UnauthorizedException('Token expired');
        }
        if(info && info.name === 'JsonWebTokenError') {
            throw new UnauthorizedException('Invalid token');
        }
        return user;
    }
    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
          context.getHandler(),
          context.getClass(),
        ]);
        if (isPublic) return true;
        return super.canActivate(context);
    }
}
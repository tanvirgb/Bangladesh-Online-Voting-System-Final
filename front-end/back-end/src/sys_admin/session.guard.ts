import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class JwtSessionGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        
        if (!token) {
            throw new UnauthorizedException('Token Not Found');
        }
        
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException('Invalid Token');
        }
        
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const authorizationHeader = request.headers.authorization;
        
        if (!authorizationHeader) {
            return undefined;
        }
        
        const [type, token] = authorizationHeader.split(' ');

        return type === 'Bearer' && token ? token : undefined;
    }
}

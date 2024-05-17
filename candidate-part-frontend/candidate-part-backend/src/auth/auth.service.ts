import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { compare } from 'bcrypt';

const EXPIRE_TIME = 20 * 1000;


@Injectable()
export class AuthService {

    constructor(private UserService: UserService,
        private JwtService: JwtService
    ) {}


    async login (dto:LoginDto){
        const user = await this.validateUser(dto);
        const payload = {
            username : user.email,
            sub:{
                name: user.name,
            },
        };
        return  {
            user,
            backendTockens:{
                accessTocken: await this.JwtService.signAsync(payload,{
                expiresIn: '1h',
                secret:  process.env.jwtSecretKey,
            }),
            refreshToken: await this.JwtService.signAsync(payload,{
                expiresIn:'7d',
                secret:process.env.jwtRefreshTokenKey,
            }),
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        },
        
        };
    }

    async validateUser(dto:LoginDto){
        const user = await this.UserService.findByEmail(dto.username);

        if(user && (await compare(dto.password, user.password))){
            const { password, ...result} = user;
             return result; 
        }
        throw new UnauthorizedException();

    }

    async refreshToken(user:any){
        const payload = {
            username : user.username,
            sub:user.sub,
        };
        return{
            accessTocken: await this.JwtService.signAsync(payload,{
                expiresIn: '1h',
                secret:  process.env.jwtSecretKey,
            }),
            refreshToken: await this.JwtService.signAsync(payload,{
                expiresIn:'7d',
                secret:process.env.jwtRefreshTokenKey,
            }),
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        };
        
        
        
    }
}

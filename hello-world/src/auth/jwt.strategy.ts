
// https://docs.nestjs.com/recipes/passport
// https://www.passportjs.org/concepts/authentication/strategies/
//// https://medium.com/@osanmisola/jwt-authentication-for-your-nestjs-server-a-tutorial-276edf67d4ce


import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({

        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

        ignoreExpiration: false,

        secretOrKey: process.env.JWT_SECRET,
      
      });
      
      }
      
      async validate(payload: any) {
      
      return { userId: payload.sub, username: payload.username };
      
      }
      
}
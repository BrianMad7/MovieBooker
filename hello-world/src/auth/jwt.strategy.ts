
// https://docs.nestjs.com/recipes/passport
// https://www.passportjs.org/concepts/authentication/strategies/
//// https://medium.com/@osanmisola/jwt-authentication-for-your-nestjs-server-a-tutorial-276edf67d4ce


import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({

        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

        ignoreExpiration: false,

        secretOrKey: jwtConstants.secret,
      
      });
      console.log('JWT_SECRET value:', process.env.JWT_SECRET);

      }
      
      async validate(payload: any) {
      
      return { id: payload.id, email: payload.email };
      
      }
      
}
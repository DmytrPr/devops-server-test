import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy as BaseStrategy,
  ExtractJwt,
  VerifiedCallback,
} from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { Environment } from 'src/interfaces/environment.interface';

@Injectable()
export class GqlAuth0JwtStrategy extends PassportStrategy(BaseStrategy) {
  constructor(private readonly configService: ConfigService<Environment>) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${configService.get(
          'AUTH0_DOMAIN',
        )}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get('AUTH0_AUDIENCE'),
      issuer: configService.get('AUTH0_DOMAIN'),
    });
  }
  validate(payload: any, done: VerifiedCallback) {
    if (!payload) {
      done(new UnauthorizedException(), false);
    }
    return done(null, payload);
  }
}

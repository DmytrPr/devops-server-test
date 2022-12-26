import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './strategies/session.serializer';

@Module({
  imports: [PassportModule, UserModule],
  providers: [
    AuthService,
    SessionSerializer,
    AuthResolver,
    LocalStrategy,
    ConfigService,
  ],
  exports: [PassportModule],
})
export class AuthModule {}

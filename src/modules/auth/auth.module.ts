import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthStrategies } from './enums/strategy.enum';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: AuthStrategies.JWT }),
    UserModule,
  ],
  providers: [ConfigService],
  exports: [PassportModule],
})
export class AuthModule {}

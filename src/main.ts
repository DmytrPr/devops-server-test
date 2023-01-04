import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import { PROD } from './constants';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { ConfigService } from '@nestjs/config';
import { Environment } from './interfaces/environment.interface';
import { redis } from './modules/redis';

async function bootstrap() {
  const RedisStore = connectRedis(session);

  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService<Environment>>(ConfigService);
  const port = configService.get('PORT');

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(
    session({
      store: new RedisStore({
        client: redis,
        disableTouch: true,
        url: 'http://localhost:6379',
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
        secure: PROD,
        sameSite: 'lax',
      },
      name: configService.get('AUTH_COOKIE'),
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(port || 4000);
}
bootstrap();

import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { Session } from 'express-session';
import { Redis } from 'ioredis';

declare module 'express-session' {
  interface Session {
    user: Omit<User, 'password'>;
  }
}

export type SessionContext = {
  req: Request & { session: Session };
  res: Response;
  redis: Redis;
};

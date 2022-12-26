import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SessionContext } from 'src/types';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = (
      GqlExecutionContext.create(context).getContext() as SessionContext
    ).req;
    return req.isAuthenticated();
  }
}

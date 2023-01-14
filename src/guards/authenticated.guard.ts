import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategies } from 'src/modules/auth/enums/strategy.enum';
import { SessionContext } from 'src/types';

@Injectable()
export class AuthenticatedGuard extends AuthGuard(AuthStrategies.JWT) {
  getRequest(context: ExecutionContext) {
    const req = (
      GqlExecutionContext.create(context).getContext() as SessionContext
    ).req;
    return req;
  }
}

import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategies } from 'src/modules/auth/enums/strategy.enum';
import { SessionContext } from 'src/types';

@Injectable()
export class LoginGuard extends AuthGuard(AuthStrategies.LOCAL) {
  async canActivate(context: ExecutionContext) {
    const req = (
      GqlExecutionContext.create(context).getContext() as SessionContext
    ).req;

    const res = (await super.canActivate(context)) as boolean;
    if (res) await super.logIn(req);

    return res;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = (ctx.getContext() as SessionContext).req;
    const { options } = ctx.getArgs();

    req.body = { ...req.body, ...options };

    return req;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

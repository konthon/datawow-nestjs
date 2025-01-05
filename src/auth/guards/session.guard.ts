import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SessionAuthGuard extends AuthGuard('session') {
  async canActivate(context: ExecutionContext) {
    const ctxRequest = GqlExecutionContext.create(context).getContext().req;
    await super.logIn(ctxRequest);
    return ctxRequest ? true : false;
  }
}

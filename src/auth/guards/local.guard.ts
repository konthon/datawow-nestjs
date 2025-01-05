import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { AuthType } from '../type';

@Injectable()
export class LocalAuthGuard extends AuthGuard(AuthType.local) {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const contextType = context.getType<GqlContextType>();
    if (contextType === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      const req = ctx.getContext().req;
      const { username } = ctx.getArgs();
      req.body.username = username;
      // note: passport-local library requires password field to authenticate
      req.body.password = 'password-placeholder';
      return req;
    }
    return context.switchToHttp().getRequest();
  }
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { User } from 'src/users/models/user';

export const CurrentUser = createParamDecorator<any, ExecutionContext, User>(
  (_data, context) => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req.user as User;
  },
);

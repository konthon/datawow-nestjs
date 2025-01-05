import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';

import { User } from 'src/users/models/user';

import { CurrentUser } from './auth.decorator';
import { LocalAuthGuard } from './guards/local.guard';
import { SessionAuthGuard } from './guards/session.guard';

@Resolver()
export class AuthResolver {
  @Query(() => User)
  async me(@CurrentUser() user: User) {
    if (!user) {
      throw new UnauthorizedException('Please login');
    }
    return user;
  }

  @Mutation(() => User)
  @UseGuards(LocalAuthGuard, SessionAuthGuard)
  async login(
    @Args({ name: 'username', type: () => String }) _username: string,
    @CurrentUser() user: User,
  ) {
    return user;
  }

  @Mutation(() => Boolean)
  async logout(@Context() context) {
    const req: Request = context.req;
    req.logout(() => {});
    return true;
  }
}

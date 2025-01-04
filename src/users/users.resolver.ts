import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { User } from './models/user';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { nullable: true })
  async user(@Args({ name: 'userId', type: () => Int }) userId: number) {
    return this.usersService.getUser(userId);
  }
}

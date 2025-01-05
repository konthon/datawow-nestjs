import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { GetPostsArgs } from 'src/posts/dto/get-posts.args';
import { Post } from 'src/posts/models/post';
import { PostsService } from 'src/posts/posts.service';

import { User } from './models/user';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @Query(() => User, { nullable: true })
  async user(@Args({ name: 'userId', type: () => Int }) userId: number) {
    return this.usersService.getUser(userId);
  }

  @ResolveField('posts', () => [Post])
  async posts(
    @Parent() user: User,
    @Args({ nullable: true }) args?: GetPostsArgs,
  ) {
    return await this.postsService.getPosts({ ...args, authorId: user.id });
  }
}

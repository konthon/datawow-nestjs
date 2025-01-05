import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CurrentUser } from 'src/auth/auth.decorator';
import { LoggedInGuard } from 'src/auth/guards/logged-in.guard';
import { CommentsService } from 'src/comments/comments.service';
import { CommunitiesService } from 'src/communities/communities.service';
import { Community } from 'src/communities/models/community';
import { User } from 'src/users/models/user';
import { UsersService } from 'src/users/users.service';

import { GetPostsArgs } from './dto/get-posts.args';
import { Post } from './models/post';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
    private readonly communitiesService: CommunitiesService,
    private readonly commentsService: CommentsService,
  ) {}

  @Query(() => [Post])
  async posts(@Args({ nullable: true }) args?: GetPostsArgs) {
    return await this.postsService.getPosts(args);
  }

  @Query(() => Post, { nullable: true })
  async post(@Args({ name: 'postId', type: () => Int }) postId: Post['id']) {
    return await this.postsService.getPost(postId);
  }

  @Query(() => [Post])
  @UseGuards(LoggedInGuard)
  async ourPosts(
    @CurrentUser() user: User,
    @Args({ nullable: true }) args?: GetPostsArgs,
  ) {
    return await this.postsService.getPosts({ ...args, authorId: user.id });
  }

  @ResolveField('author', () => User)
  async author(@Parent() post: Post) {
    return await this.usersService.getUser(post.authorId);
  }

  @ResolveField('community', () => Community)
  async community(@Parent() post: Post) {
    return await this.communitiesService.getCommunity(post.communityId);
  }

  @ResolveField('comments', () => [Comment])
  async comments(@Parent() post: Post) {
    return this.commentsService.getCommentsByPost(post.id);
  }
}

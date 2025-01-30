import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CurrentUser } from 'src/auth/auth.decorator';
import { CommentsService } from 'src/comments/comments.service';
import { Comment } from 'src/comments/models/comment';
import { CommunitiesService } from 'src/communities/communities.service';
import { Community } from 'src/communities/models/community';
import { User } from 'src/users/models/user';
import { UsersService } from 'src/users/users.service';

import { LoggedInGuard } from '../auth/guards/logged-in.guard';
import { CreatePostInput } from './dto/create-post.args';
import { GetPostsArgs } from './dto/get-posts.args';
import { UpdatePostInput } from './dto/update-post.args';
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

  @Mutation(() => Post)
  @UseGuards(LoggedInGuard)
  async createPost(
    @CurrentUser() user: User,
    @Args('createPostInput') input: CreatePostInput,
  ) {
    return await this.postsService.createPost(user, input);
  }

  @Mutation(() => Post)
  @UseGuards(LoggedInGuard)
  async updatePost(
    @CurrentUser() user: User,
    @Args({ name: 'postId', type: () => Int }) postId: number,
    @Args('updatePostInput') input: UpdatePostInput,
  ) {
    return await this.postsService.updatePost(user, postId, input);
  }

  @Mutation(() => Post)
  @UseGuards(LoggedInGuard)
  async deletePost(
    @CurrentUser() user: User,
    @Args({ name: 'postId', type: () => Int }) postId: number,
  ) {
    return await this.postsService.deletePost(user, postId);
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

  @ResolveField('commentsCount', () => Int)
  async commentsCount(@Parent() post: Post) {
    return this.commentsService.getCommentsCountByPost(post.id);
  }
}

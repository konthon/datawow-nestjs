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
import { User } from 'src/users/models/user';
import { UsersService } from 'src/users/users.service';

import { LoggedInGuard } from '../auth/guards/logged-in.guard';
import { CommentsService } from './comments.service';
import { CommentInput } from './dto/comment.args';
import { Comment } from './models/comment';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => Comment, { nullable: true })
  async comment(
    @Args({ name: 'commentId', type: () => Int }) commentId: number,
  ) {
    return await this.commentsService.getComment(commentId);
  }

  @Mutation(() => Comment)
  @UseGuards(LoggedInGuard)
  async addComment(
    @CurrentUser() user: User,
    @Args({ name: 'postId', type: () => Int }) postId: number,
    @Args('commentInput') input: CommentInput,
  ) {
    return await this.commentsService.addCommentOnPost(user, postId, input);
  }

  @Mutation(() => Comment)
  @UseGuards(LoggedInGuard)
  async updateComment(
    @CurrentUser() user: User,
    @Args({ name: 'commentId', type: () => Int }) commentId: number,
    @Args('commentInput') input: CommentInput,
  ) {
    return await this.commentsService.updateComment(user, commentId, input);
  }

  @Mutation(() => Comment)
  @UseGuards(LoggedInGuard)
  async deleteComment(
    @CurrentUser() user: User,
    @Args({ name: 'commentId', type: () => Int }) commentId: number,
  ) {
    return await this.commentsService.deleteComment(user, commentId);
  }

  @ResolveField('user', () => User)
  async user(@Parent() comment: Comment) {
    return await this.usersService.getUser(comment.userId);
  }
}

import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { Comment } from './models/comment';
import { CommentsService } from './comments.service';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => Comment, { nullable: true })
  async comment(
    @Args({ name: 'commentId', type: () => Int }) commentId: number,
  ) {
    return this.commentsService.getComment(commentId);
  }
}

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Comment as CommentModel } from '@prisma/client';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: CommentModel['id'];

  @Field(() => String)
  content: CommentModel['content'];

  @Field(() => Date)
  createdAt: CommentModel['createdAt'];

  @Field(() => Date)
  updatedAt: CommentModel['updatedAt'];

  @Field(() => Int)
  postId: CommentModel['postId'];

  @Field(() => Int)
  userId: CommentModel['userId'];
}

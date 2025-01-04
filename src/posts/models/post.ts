import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post as PostModel } from '@prisma/client';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: PostModel['id'];

  @Field(() => String)
  title: PostModel['title'];

  @Field(() => String)
  content: PostModel['content'];

  @Field(() => Date)
  createdAt: PostModel['createdAt'];

  @Field(() => Date)
  updatedAt: PostModel['updatedAt'];

  @Field(() => Int)
  authorId: PostModel['authorId'];

  @Field(() => Int)
  communityId: PostModel['communityId'];
}

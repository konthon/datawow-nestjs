import { Field, InputType, Int, PickType } from '@nestjs/graphql';

import { Post } from '../models/post';

@InputType()
export class CreatePostInput extends PickType(Post, [
  'title',
  'content',
  'communityId',
]) {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => Int)
  communityId: number;
}

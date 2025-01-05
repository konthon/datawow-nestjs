import { Field, InputType, PickType } from '@nestjs/graphql';

import { Comment } from '../models/comment';

@InputType()
export class CommentInput extends PickType(Comment, ['content']) {
  @Field(() => String)
  content: string;
}

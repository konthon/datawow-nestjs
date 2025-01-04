import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Community } from 'src/communities/models/community';
import { User } from 'src/users/models/user';

@ArgsType()
export class GetPostsArgs {
  @Field(() => String, { nullable: true })
  title?: string | null;

  @Field(() => Int, { nullable: true })
  authorId?: User['id'] | null;

  @Field(() => Int, { nullable: true })
  communityId?: Community['id'] | null;
}

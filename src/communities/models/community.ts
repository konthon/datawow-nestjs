import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Community as CommunityModel } from '@prisma/client';

@ObjectType()
export class Community {
  @Field(() => Int)
  id: CommunityModel['id'];

  @Field(() => String)
  name: CommunityModel['name'];
}

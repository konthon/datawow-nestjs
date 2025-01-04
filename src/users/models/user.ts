import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User as UserModel } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => ID)
  id: UserModel['id'];

  @Field(() => String)
  username: UserModel['username'];
}

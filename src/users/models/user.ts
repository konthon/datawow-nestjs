import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User as UserModel } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => Int)
  id: UserModel['id'];

  @Field(() => String)
  username: UserModel['username'];
}

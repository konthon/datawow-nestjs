import { Field, InputType, PickType } from '@nestjs/graphql';

import { User } from '../models/user';

@InputType()
export class CreateUserInput extends PickType(User, ['username']) {
  @Field(() => String)
  username: string;
}

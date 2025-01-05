import { InputType, PartialType } from '@nestjs/graphql';

import { CreatePostInput } from './create-post.args';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {}

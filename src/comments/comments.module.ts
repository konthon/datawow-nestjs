import { Module } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
  providers: [CommentsService, CommentsResolver, UsersService],
  exports: [CommentsService],
})
export class CommentsModule {}

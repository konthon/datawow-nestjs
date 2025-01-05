import { Module } from '@nestjs/common';

import { CommentsService } from 'src/comments/comments.service';
import { CommunitiesService } from 'src/communities/communities.service';
import { UsersService } from 'src/users/users.service';

import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  providers: [
    PostsService,
    PostsResolver,

    CommentsService,
    CommunitiesService,
    UsersService,
  ],
  exports: [PostsService],
})
export class PostsModule {}

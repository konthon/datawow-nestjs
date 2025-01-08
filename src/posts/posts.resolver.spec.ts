import { Test, TestingModule } from '@nestjs/testing';

import { CommentsService } from 'src/comments/comments.service';
import { CommunitiesService } from 'src/communities/communities.service';
import { UsersService } from 'src/users/users.service';

import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

describe('PostsResolver', () => {
  let resolver: PostsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsResolver,
        { provide: PostsService, useValue: {} },
        { provide: UsersService, useValue: {} },
        { provide: CommunitiesService, useValue: {} },
        { provide: CommentsService, useValue: {} },
      ],
    }).compile();

    resolver = module.get<PostsResolver>(PostsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from 'src/users/users.service';

import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

describe('CommentsResolver', () => {
  let resolver: CommentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsResolver,
        {
          provide: CommentsService,
          useValue: {},
        },
        {
          provide: UsersService,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<CommentsResolver>(CommentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

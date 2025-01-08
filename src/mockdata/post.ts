import { Post } from '@prisma/client';

import { mockUsers } from './user';
import { mockCommunities } from './community';

export const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Title1',
    content: 'content1',
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: mockUsers[0].id,
    communityId: mockCommunities[0].id,
  },
  {
    id: 2,
    title: 'Title2',
    content: 'content2',
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: mockUsers[0].id,
    communityId: mockCommunities[1].id,
  },
  {
    id: 3,
    title: 'Title3',
    content: 'content3',
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: mockUsers[1].id,
    communityId: mockCommunities[0].id,
  },
  {
    id: 4,
    title: 'Something',
    content: 'content4',
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: mockUsers[1].id,
    communityId: mockCommunities[1].id,
  },
];

export const mockNewPost: Post = {
  id: 5,
  title: 'New Title',
  content: 'New Content',
  createdAt: new Date(),
  updatedAt: new Date(),
  authorId: mockUsers[0].id,
  communityId: mockCommunities[0].id,
};

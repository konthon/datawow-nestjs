import { Comment } from '@prisma/client';
import { mockUsers } from './user';

export const mockComments: Comment[] = [
  {
    id: 1,
    content: 'comment1',
    postId: 1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    content: 'comment2',
    postId: 2,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockNewComment: Comment = {
  id: 3,
  content: 'comment3',
  postId: 1,
  userId: mockUsers[0].id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

import { User } from '@prisma/client';

export const mockUsers: User[] = [
  {
    id: 1,
    username: 'first',
  },
  {
    id: 2,
    username: 'second',
  },
];

export const mockNewUser: User = { id: 3, username: 'new_user' };

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { mockNewUser, mockUsers } from 'src/mockdata/user';
import { PrismaService } from 'src/prisma/prisma.service';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUser', () => {
    it('should return a user', () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUsers[0]);
      expect(service.getUser(1)).resolves.toEqual(mockUsers[0]);
    });
    it('should be rejected if user not found', () => {
      prismaMock.user.findUnique.mockResolvedValue(undefined);
      expect(service.getUser(0)).rejects.toThrow();
    });
  });

  describe('getUserByUsername', () => {
    it('should return a user', () => {
      prismaMock.user.findFirst.mockResolvedValue(mockUsers[0]);
      expect(service.getUserByUsername('first')).resolves.toEqual(mockUsers[0]);
    });
  });

  describe('createUser', () => {
    it('should create a new user', () => {
      prismaMock.user.create.mockResolvedValue(mockNewUser);
      expect(
        service.createUser({ username: mockNewUser['username'] }),
      ).resolves.toEqual(mockNewUser);
    });
    it('should be rejected if no username provided', () => {
      expect(service.createUser({ username: '' })).rejects.toThrow();
    });
  });
});

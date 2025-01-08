import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';

import { mockNewUser, mockUsers } from 'src/mockdata/user';
import { UsersService } from 'src/users/users.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockDeep<UsersService>(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate user', () => {
    it('should return an existing user', () => {
      usersService.getUserByUsername = jest
        .fn()
        .mockResolvedValue(mockUsers[0]);

      expect(service.validateUser(mockUsers[0].username)).resolves.toEqual(
        mockUsers[0],
      );
    });
    it('should create a new user', () => {
      usersService.getUserByUsername = jest.fn().mockResolvedValue(undefined);
      usersService.createUser = jest.fn().mockResolvedValue(mockNewUser);

      expect(service.validateUser(mockNewUser.username)).resolves.toEqual(
        mockNewUser,
      );
    });
  });
});

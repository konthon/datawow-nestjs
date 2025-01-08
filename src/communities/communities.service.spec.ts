import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { mockCommunities } from 'src/mockdata/community';
import { PrismaService } from 'src/prisma/prisma.service';

import { CommunitiesService } from './communities.service';

describe('CommunitiesService', () => {
  let service: CommunitiesService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunitiesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CommunitiesService>(CommunitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCommunities', () => {
    it('should return communities', () => {
      prismaMock.community.findMany.mockResolvedValue(mockCommunities);
      expect(service.getCommunities()).resolves.toEqual(mockCommunities);
    });
  });

  describe('getCommunity', () => {
    it('should return a community', () => {
      prismaMock.community.findUnique.mockResolvedValue(mockCommunities[0]);
      expect(service.getCommunity(mockCommunities[0].id)).resolves.toEqual(
        mockCommunities[0],
      );
    });
  });
});

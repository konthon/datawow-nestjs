import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { mockComments, mockNewComment } from 'src/mockdata/comment';
import { PrismaService } from 'src/prisma/prisma.service';

import { CommentsService } from './comments.service';
import { mockUsers } from 'src/mockdata/user';

describe('CommentsService', () => {
  let service: CommentsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getComment', () => {
    it('should return a comment', () => {
      prismaMock.comment.findUnique.mockResolvedValue(mockComments[0]);
      expect(service.getComment(mockComments[0].id)).resolves.toEqual(
        mockComments[0],
      );
    });
    it('should be rejected', () => {
      prismaMock.comment.findUnique.mockResolvedValue(undefined);
      expect(service.getComment(0)).rejects.toThrow();
    });
  });

  describe('getCommentByPost', () => {
    const postId = 1;
    const filteredMockComments = mockComments.filter(
      (comment) => comment.postId === postId,
    );
    it('should return comments', () => {
      prismaMock.comment.findMany.mockResolvedValue(filteredMockComments);
      expect(service.getCommentsByPost(postId)).resolves.toEqual(
        filteredMockComments,
      );
    });
  });

  describe('getCommentsCountByPost', () => {
    const postId = 1;
    const filteredMockComments = mockComments.filter(
      (comment) => comment.postId === postId,
    );
    it('should return comments', () => {
      prismaMock.comment.count.mockResolvedValue(filteredMockComments.length);
      expect(service.getCommentsCountByPost(postId)).resolves.toEqual(
        filteredMockComments.length,
      );
    });
  });

  describe('addCommentOnPost', () => {
    it('should create a new comment', () => {
      prismaMock.comment.create.mockResolvedValue(mockNewComment);
      expect(
        service.addCommentOnPost(mockUsers[0], 1, {
          content: mockNewComment.content,
        }),
      ).resolves.toEqual(mockNewComment);
    });
    it('should be rejected if no postId', () => {
      expect(
        service.addCommentOnPost(mockUsers[0], 0, { content: '' }),
      ).rejects.toThrow();
    });
    it('should be rejected if no content', () => {
      expect(
        service.addCommentOnPost(mockUsers[0], 0, { content: '' }),
      ).rejects.toThrow();
    });
  });
});

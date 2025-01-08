import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { mockNewPost, mockPosts } from 'src/mockdata/post';
import { mockUsers } from 'src/mockdata/user';
import { PrismaService } from 'src/prisma/prisma.service';

import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPosts', () => {
    it('should return posts', () => {
      prismaMock.post.findMany.mockResolvedValue(mockPosts);
      expect(service.getPosts()).resolves.toEqual(mockPosts);
    });
    it('should filter posts containing "thing" keyword in title', () => {
      const title = 'thing';
      const filteredMockPosts = mockPosts.filter((post) =>
        post.title.includes(title),
      );
      prismaMock.post.findMany.mockResolvedValue(filteredMockPosts);
      expect(service.getPosts({ title })).resolves.toEqual(filteredMockPosts);
    });
    it('should filter posts from a community', () => {
      const communityId = 1;
      const filteredMockPosts = mockPosts.filter(
        (post) => post.communityId === communityId,
      );
      prismaMock.post.findMany.mockResolvedValue(filteredMockPosts);
      expect(service.getPosts({ communityId })).resolves.toEqual(
        filteredMockPosts,
      );
    });
  });

  describe('getPost', () => {
    it('should return a post', () => {
      const mockPost = mockPosts[0];
      const postId = mockPost.id;
      prismaMock.post.findUnique.mockResolvedValue(mockPost);
      expect(service.getPost(postId)).resolves.toEqual(mockPost);
    });
    it('should be rejected if post not found', () => {
      const postId = 0;
      prismaMock.post.findUnique.mockResolvedValue(undefined);
      expect(service.getPost(postId)).rejects.toThrow();
    });
  });

  describe('createPost', () => {
    it('should create a new post', () => {
      prismaMock.post.create.mockResolvedValue(mockNewPost);
      expect(
        service.createPost(mockUsers[0], {
          title: mockNewPost.title,
          content: mockNewPost.content,
          communityId: mockNewPost.communityId,
        }),
      ).resolves.toEqual(mockNewPost);
    });
  });

  describe('updatePost', () => {
    it('should update the post', () => {
      const title = 'new title';
      const updatedMockPost = { ...mockPosts[0], title };
      prismaMock.$transaction.mockResolvedValue(updatedMockPost);
      expect(
        service.updatePost(mockUsers[0], mockPosts[0].id, { title }),
      ).resolves.toEqual(updatedMockPost);
    });
  });

  describe('deletePost', () => {
    it('should delete the post', () => {
      const postId = 1;
      const deletedMockPost = mockPosts.find((post) => post.id === postId)!;
      prismaMock.$transaction.mockResolvedValue(deletedMockPost);
      expect(service.deletePost(mockUsers[0], postId)).resolves.toEqual(
        deletedMockPost,
      );
    });
  });
});

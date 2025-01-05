import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/models/user';

import { CreatePostInput } from './dto/create-post.args';
import { GetPostsArgs } from './dto/get-posts.args';
import { UpdatePostInput } from './dto/update-post.args';
import { Post } from './models/post';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPosts(args?: GetPostsArgs) {
    let mappedArgs: Parameters<typeof this.prisma.post.findMany>[0] = {
      orderBy: [{ updatedAt: 'desc' }],
    };
    if (args?.title && args.title.length >= 2) {
      mappedArgs = {
        ...mappedArgs,
        where: {
          ...mappedArgs.where,
          title: { contains: args.title },
        },
      };
    }
    if (args?.authorId) {
      mappedArgs = {
        ...mappedArgs,
        where: {
          ...mappedArgs.where,
          authorId: args.authorId,
        },
      };
    }
    if (args?.communityId) {
      mappedArgs = {
        ...mappedArgs,
        where: {
          ...mappedArgs.where,
          communityId: args.communityId,
        },
      };
    }
    return await this.prisma.post.findMany(mappedArgs);
  }

  async getPost(postId: Post['id']) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async createPost(currentUser: User, input: CreatePostInput) {
    if (!input.title) {
      throw new BadRequestException('Title is required');
    }
    if (!input.content) {
      throw new BadRequestException('Content is required');
    }
    if (!input.communityId) {
      throw new BadRequestException('Please select a community');
    }
    return await this.prisma.post.create({
      data: {
        title: input.title,
        content: input.content,
        author: { connect: { id: currentUser.id } },
        community: { connect: { id: input.communityId } },
      },
    });
  }

  async updatePost(
    currentUser: User,
    postId: Post['id'],
    input: UpdatePostInput,
  ) {
    return await this.prisma.$transaction(async (tx) => {
      const post = await tx.post.findUnique({ where: { id: postId } });
      if (post.authorId !== currentUser.id) {
        throw new ForbiddenException("Cannot edit other people's post");
      }
      return await tx.post.update({
        where: { id: postId },
        data: {
          title: input.title,
          content: input.content,
          community: input.communityId
            ? { connect: { id: input.communityId } }
            : undefined,
        },
      });
    });
  }

  async deletePost(currentUser: User, postId: Post['id']) {
    return await this.prisma.$transaction(async (tx) => {
      const post = await tx.post.findUnique({ where: { id: postId } });
      if (post.authorId !== currentUser.id) {
        throw new ForbiddenException("Cannot delete other people's post");
      }
      return await tx.post.delete({ where: { id: postId } });
    });
  }
}

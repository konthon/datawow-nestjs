import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { GetPostsArgs } from './dto/get-posts.args';
import { Post } from './models/post';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPosts(args?: GetPostsArgs) {
    let mappedArgs: Parameters<typeof this.prisma.post.findMany>[0] = {};
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
}

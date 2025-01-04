import { Injectable, NotFoundException } from '@nestjs/common';

import { Post } from 'src/posts/models/post';
import { PrismaService } from 'src/prisma/prisma.service';

import { Comment } from './models/comment';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getComment(commentId: Comment['id']) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async getCommentsByPost(postId: Post['id']) {
    return await this.prisma.comment.findMany({
      where: { postId },
      orderBy: [{ updatedAt: 'desc' }],
    });
  }

  async getCommentsCountByPost(postId: Post['id']) {
    return await this.prisma.comment.count({
      where: { postId },
    });
  }
}

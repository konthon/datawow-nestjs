import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Post } from 'src/posts/models/post';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/models/user';

import { CommentInput } from './dto/comment.args';
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

  async addCommentOnPost(
    currentUser: User,
    postId: Post['id'],
    input: CommentInput,
  ) {
    if (!postId) {
      throw new BadRequestException('Post not found');
    }
    if (!input.content) {
      throw new BadRequestException('Content is required');
    }
    return await this.prisma.comment.create({
      data: {
        content: input.content,
        user: { connect: { id: currentUser.id } },
        post: { connect: { id: postId } },
      },
    });
  }

  async updateComment(
    currentUser: User,
    commentId: Comment['id'],
    input: CommentInput,
  ) {
    return await this.prisma.$transaction(async (tx) => {
      const comment = await tx.comment.findUnique({ where: { id: commentId } });
      if (currentUser.id !== comment.userId) {
        throw new ForbiddenException("Cannot edit other people's comment");
      }
      return await tx.comment.update({
        where: { id: commentId },
        data: { content: input.content },
      });
    });
  }

  async deleteComment(currentUser: User, commentId: Comment['id']) {
    return await this.prisma.$transaction(async (tx) => {
      const comment = await tx.comment.findUnique({ where: { id: commentId } });
      if (currentUser.id !== comment.userId) {
        throw new ForbiddenException("Cannot delete other people's comment");
      }
      return await tx.comment.delete({ where: { id: commentId } });
    });
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserInput } from './dto/create-user.args';
import { User } from './models/user';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(userId: User['id']) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserByUsername(username: string) {
    return await this.prisma.user.findFirst({ where: { username } });
  }

  async createUser(input: CreateUserInput) {
    if (!input.username) {
      throw new BadRequestException('Please provide a username');
    }
    return this.prisma.user.create({ data: { username: input.username } });
  }
}

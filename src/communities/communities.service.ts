import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { Community } from './models/community';

@Injectable()
export class CommunitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCommunities() {
    return await this.prisma.community.findMany();
  }

  async getCommunity(communityId: Community['id']) {
    return await this.prisma.community.findUnique({
      where: { id: communityId },
    });
  }
}

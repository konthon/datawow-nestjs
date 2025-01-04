import { Query, Resolver } from '@nestjs/graphql';
import { CommunitiesService } from './communities.service';
import { Community } from './models/community';

@Resolver(() => Community)
export class CommunitiesResolver {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Query(() => [Community])
  async communities() {
    return await this.communitiesService.getCommunities();
  }
}

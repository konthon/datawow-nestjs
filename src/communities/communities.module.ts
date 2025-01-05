import { Module } from '@nestjs/common';

import { CommunitiesResolver } from './communities.resolver';
import { CommunitiesService } from './communities.service';

@Module({
  providers: [CommunitiesResolver, CommunitiesService],
  exports: [CommunitiesService],
})
export class CommunitiesModule {}

import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { GetPostsArgs } from './dto/get-posts.args';
import { Post } from './models/post';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post])
  async posts(@Args({ nullable: true }) args?: GetPostsArgs) {
    return await this.postsService.getPosts(args);
  }

  @Query(() => Post, { nullable: true })
  async post(@Args({ name: 'postId', type: () => Int }) postId: Post['id']) {
    return await this.postsService.getPost(postId);
  }
}

import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '@prisma/client';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { SessionContext } from 'src/types';
import { CreatePostDTO } from '../dtos/create-post.dto';
import { Post } from '../entities/post.entity';
import { PostService } from '../services/post.service';

@Resolver(Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  @UseGuards(AuthenticatedGuard)
  posts() {
    return this.postService.getAll();
  }

  @Query(() => Post)
  @UseGuards(AuthenticatedGuard)
  post(
    @Args('id', { type: () => Int })
    postId: Post['id'],
  ) {
    return this.postService.findOneById(postId);
  }

  @Mutation(() => Post)
  @UseGuards(AuthenticatedGuard)
  createPost(
    @Args('options') options: CreatePostDTO,
    @Context() ctx: SessionContext,
  ) {
    return this.postService.createPost(
      options,
      (ctx.req.user as Pick<User, 'id'>).id,
    );
  }

  @ResolveField('parent', () => Post)
  portfolios(@Parent() post: Post) {
    if (!post.parentId) {
      return null;
    }

    return this.postService.findOneById(post.parentId);
  }
}

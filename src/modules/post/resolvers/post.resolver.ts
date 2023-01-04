import { NotFoundException, UseGuards } from '@nestjs/common';
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
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { User } from 'src/modules/user/entities/user.entity';
import { SessionContext } from 'src/types';
import { CreatePostDTO } from '../dtos/create-post.dto';
import { EditPostDTO } from '../dtos/edit-post.dto';
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

  @Mutation(() => Post)
  @UseGuards(AuthenticatedGuard)
  async updatePost(
    @Args('options') options: EditPostDTO,
    @Context() ctx: SessionContext,
  ) {
    const post = await this.postService.editPost(
      options,
      (ctx.req.user as Pick<User, 'id'>).id,
    );

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  @ResolveField('parent', () => Post)
  parent(@Parent() post: Post) {
    if (!post.parentId) {
      return null;
    }

    return this.postService.findOneById(post.parentId);
  }

  @ResolveField('children', () => Post)
  children(@Parent() post: Post) {
    return this.postService.findChildren(post.id);
  }

  @ResolveField('user', () => User)
  user(@Parent() post: Post) {
    return this.postService.findPostAuthor(post.id);
  }
}

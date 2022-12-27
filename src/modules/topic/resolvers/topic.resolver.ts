import { Post, UseGuards } from '@nestjs/common';
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
import { Portfolio, User } from '@prisma/client';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { PostService } from 'src/modules/post/services/post.service';
import { SessionContext } from 'src/types';
import { CreateTopicDTO } from '../dtos/create-topic.dto';
import { Topic } from '../entities/topic.entity';
import { TopicService } from '../services/topic.service';

@Resolver(Topic)
export class TopicResolver {
  constructor(
    private readonly topicService: TopicService,
    private readonly postService: PostService,
  ) {}

  @Query(() => [Topic])
  @UseGuards(AuthenticatedGuard)
  topics() {
    return this.topicService.getAll();
  }

  @Query(() => Topic)
  @UseGuards(AuthenticatedGuard)
  topic(
    @Args('id', { type: () => Int })
    topicId: Portfolio['id'],
  ) {
    return this.topicService.findOneById(topicId);
  }

  @Mutation(() => Topic)
  @UseGuards(AuthenticatedGuard)
  createTopic(
    @Args('options') options: CreateTopicDTO,
    @Context() ctx: SessionContext,
  ) {
    return this.topicService.createTopic(
      options,
      (ctx.req.user as Pick<User, 'id'>).id,
    );
  }

  @ResolveField('posts', () => [Post])
  posts(@Parent() topic: Topic) {
    return this.postService.findTopicPosts(topic.id);
  }

  @ResolveField('user', () => [Post])
  user(@Parent() topic: Topic) {
    return this.topicService.findTopicAuthor(topic.id);
  }
}

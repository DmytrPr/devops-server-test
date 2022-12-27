import { Post, UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Portfolio } from '@prisma/client';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { Topic } from 'src/modules/topic/entities/topic.entity';
import { TopicService } from 'src/modules/topic/services/topic.service';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { ForumCategory } from '../entities/forum-category.entity';
import { ForumCategoryService } from '../services/forum-category.service';

@Resolver(ForumCategory)
export class ForumCategoryResolver {
  constructor(
    private readonly categoryService: ForumCategoryService,
    private readonly topicService: TopicService,
  ) {}

  @Query(() => [ForumCategory])
  @UseGuards(AuthenticatedGuard)
  forumCategories() {
    return this.categoryService.getAll();
  }

  @Query(() => ForumCategory)
  @UseGuards(AuthenticatedGuard)
  forumCategory(
    @Args('id', { type: () => Int })
    categoryId: Portfolio['id'],
  ) {
    return this.categoryService.findOneById(categoryId);
  }

  @Mutation(() => ForumCategory)
  @UseGuards(AuthenticatedGuard)
  createForumCategory(@Args('options') options: CreateCategoryDTO) {
    return this.categoryService.createCategory(options);
  }

  @ResolveField('topics', () => [Topic])
  posts(@Parent() caregory: ForumCategory) {
    return this.topicService.findCaregoryTopics(caregory.id);
  }
}

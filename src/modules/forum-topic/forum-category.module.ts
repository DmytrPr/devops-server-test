import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services/prisma.service';
import { TopicService } from '../topic/services/topic.service';
import { ForumCategoryResolver } from './resolvers/forum-category.resolver';
import { ForumCategoryService } from './services/forum-category.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    ForumCategoryService,
    TopicService,
    ForumCategoryResolver,
  ],
  exports: [],
})
export class ForumCategoryModule {}

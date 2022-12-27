import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services/prisma.service';
import { PostService } from '../post/services/post.service';
import { TopicResolver } from './resolvers/topic.resolver';
import { TopicService } from './services/topic.service';

@Module({
  imports: [],
  providers: [PrismaService, TopicService, PostService, TopicResolver],
  exports: [],
})
export class TopicModule {}

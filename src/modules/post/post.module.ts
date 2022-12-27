import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services/prisma.service';
import { PostResolver } from './resolvers/post.resolver';
import { PostService } from './services/post.service';

@Module({
  imports: [],
  providers: [PrismaService, PostResolver, PostService],
  exports: [],
})
export class PostModule {}

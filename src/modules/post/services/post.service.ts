import { Injectable } from '@nestjs/common/decorators';
import { Post, Topic, User } from '@prisma/client';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { CreatePostDTO } from '../dtos/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  getAll(): Promise<Post[]> {
    return this.prismaService.post.findMany();
  }

  findOneById(id: Post['id']): Promise<Post> {
    return this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
  }

  findTopicPosts(id: Topic['id']): Promise<Post[]> {
    return this.prismaService.post.findMany({
      where: {
        topic: {
          id,
        },
      },
    });
  }

  findChildren(id: Post['id']): Promise<Post[]> {
    return this.prismaService.post.findMany({
      where: {
        parentId: id,
      },
    });
  }

  createPost(data: CreatePostDTO, userId: User['id']): Promise<Post> {
    const { topicId, parentId, ...rest } = data;

    return this.prismaService.post.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        topic: {
          connect: {
            id: topicId,
          },
        },
        parent: parentId
          ? {
              connect: {
                id: parentId,
              },
            }
          : undefined,
        ...rest,
      },
    });
  }
}

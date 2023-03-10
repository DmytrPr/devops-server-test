import { Injectable } from '@nestjs/common/decorators';
import { ForumCategory, Topic, User } from '@prisma/client';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { CreateTopicDTO } from '../dtos/create-topic.dto';
import { EditTopicDTO } from '../dtos/edit-topic.dto';

@Injectable()
export class TopicService {
  constructor(private readonly prismaService: PrismaService) {}

  getAll(): Promise<Topic[]> {
    return this.prismaService.topic.findMany();
  }

  findOneById(id: Topic['id']): Promise<Topic> {
    return this.prismaService.topic.findUnique({
      where: {
        id,
      },
    });
  }

  findCaregoryTopics(id: ForumCategory['id']): Promise<Topic[]> {
    return this.prismaService.topic.findMany({
      where: {
        forumCategory: {
          id,
        },
      },
    });
  }

  createTopic(data: CreateTopicDTO, userId: User['id']): Promise<Topic> {
    const { categoryId, ...rest } = data;
    return this.prismaService.topic.create({
      data: {
        forumCategory: {
          connect: { id: categoryId },
        },
        user: {
          connect: { id: userId },
        },
        ...rest,
      },
    });
  }

  async editTopic(data: EditTopicDTO, userId: User['id']): Promise<Topic> {
    const { id, ...rest } = data;

    const topic = await this.prismaService.topic.findUnique({
      where: {
        id,
      },
    });

    if (topic.userId !== userId) {
      return null;
    }

    return this.prismaService.topic.update({
      where: {
        id,
      },
      data: rest,
    });
  }

  findTopicAuthor(id: Topic['id']): Promise<Omit<User, 'password'>> {
    return this.prismaService.user.findFirst({
      where: {
        topics: {
          some: {
            id,
          },
        },
      },
    });
  }
}

import { Injectable } from '@nestjs/common/decorators';
import { ForumCategory } from '@prisma/client';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { CreateCategoryDTO } from '../dtos/create-category.dto';

@Injectable()
export class ForumCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  getAll(): Promise<ForumCategory[]> {
    return this.prismaService.forumCategory.findMany();
  }

  findOneById(id: ForumCategory['id']): Promise<ForumCategory> {
    return this.prismaService.forumCategory.findUnique({
      where: {
        id,
      },
    });
  }

  createCategory(data: CreateCategoryDTO): Promise<ForumCategory> {
    return this.prismaService.forumCategory.create({
      data,
    });
  }
}

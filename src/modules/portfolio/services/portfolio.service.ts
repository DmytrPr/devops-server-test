import { Injectable } from '@nestjs/common';
import { Portfolio, User } from '@prisma/client';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { CreatePortfolioDTO } from '../dtos/create-portfolio.dto';
import { EditPortfolioDTO } from '../dtos/edit-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(private readonly prismaService: PrismaService) {}

  findOneById(id: Portfolio['id']): Promise<Portfolio | null> {
    return this.prismaService.portfolio.findUnique({
      where: {
        id,
      },
    });
  }

  getAll(): Promise<Portfolio[] | null> {
    return this.prismaService.portfolio.findMany();
  }

  getUserPortfolios(id: User['id']): Promise<Portfolio[] | null> {
    return this.prismaService.portfolio.findMany({
      where: {
        user: {
          id,
        },
      },
    });
  }

  createPortfolio(
    portfolio: CreatePortfolioDTO,
    userId: User['id'],
  ): Promise<Portfolio> {
    return this.prismaService.portfolio.create({
      data: {
        ...portfolio,
        startDate: new Date(portfolio.startDate),
        endDate: new Date(portfolio.endDate),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async editPortfolio(
    data: EditPortfolioDTO,
    userId: User['id'],
  ): Promise<Portfolio> {
    const { id, ...rest } = data;

    const portfolio = await this.prismaService.portfolio.findUnique({
      where: {
        id,
      },
    });

    if (portfolio.userId !== userId) {
      return null;
    }

    return this.prismaService.portfolio.update({
      where: {
        id,
      },
      data: rest,
    });
  }
}

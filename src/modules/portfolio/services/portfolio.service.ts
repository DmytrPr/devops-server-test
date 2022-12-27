import { Injectable } from '@nestjs/common';
import { Portfolio, User } from '@prisma/client';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { CreatePortfolioDTO } from '../dtos/create-portfolio.dto';

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
}

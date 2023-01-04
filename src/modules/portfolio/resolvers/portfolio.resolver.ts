import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Portfolio, User } from '@prisma/client';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { SessionContext } from 'src/types';
import { CreatePortfolioDTO } from '../dtos/create-portfolio.dto';
import { EditPortfolioDTO } from '../dtos/edit-portfolio.dto';
import { Portfolio as PortfolioEntity } from '../entities/portfolio.entity';
import { PortfolioService } from '../services/portfolio.service';

@Resolver(PortfolioEntity)
export class PortfolioResolver {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Query(() => [PortfolioEntity])
  @UseGuards(AuthenticatedGuard)
  portfolios() {
    return this.portfolioService.getAll();
  }

  @Query(() => PortfolioEntity)
  @UseGuards(AuthenticatedGuard)
  portfolio(
    @Args('id', { type: () => Int })
    portfolioId: Portfolio['id'],
  ) {
    return this.portfolioService.findOneById(portfolioId);
  }

  @Mutation(() => PortfolioEntity)
  @UseGuards(AuthenticatedGuard)
  createPortfolio(
    @Args('options') options: CreatePortfolioDTO,
    @Context() ctx: SessionContext,
  ) {
    return this.portfolioService.createPortfolio(
      options,
      (ctx.req.user as Pick<User, 'id'>).id,
    );
  }

  @Mutation(() => PortfolioEntity)
  @UseGuards(AuthenticatedGuard)
  async updatePortfolio(
    @Args('options') options: EditPortfolioDTO,
    @Context() ctx: SessionContext,
  ) {
    const post = await this.portfolioService.editPortfolio(
      options,
      (ctx.req.user as Pick<User, 'id'>).id,
    );

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }
}

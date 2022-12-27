import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '@prisma/client';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { User as UserEntity } from 'src/modules/user/entities/user.entity';
import { Portfolio as PortfolioEntity } from '../portfolio/entities/portfolio.entity';
import { PortfolioService } from '../portfolio/services/portfolio.service';
import { UserService } from './services/user.service';

@Resolver(UserEntity)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly portfolioService: PortfolioService,
  ) {}

  @Query(() => [UserEntity])
  @UseGuards(AuthenticatedGuard)
  users() {
    return this.userService.getAll();
  }

  @Query(() => UserEntity)
  @UseGuards(AuthenticatedGuard)
  user(
    @Args('id', { type: () => Int })
    userId: User['id'],
  ) {
    return this.userService.findOneById(userId);
  }

  @ResolveField('portfolios', () => [PortfolioEntity])
  portfolios(@Parent() user: UserEntity) {
    return this.portfolioService.getUserPortfolios(user.id);
  }
}

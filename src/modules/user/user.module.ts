import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services/prisma.service';
import { PortfolioService } from '../portfolio/services/portfolio.service';
import { UserService } from './services/user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [],
  providers: [UserService, PrismaService, PortfolioService, UserResolver],
  exports: [UserService],
})
export class UserModule {}

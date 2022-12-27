import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services/prisma.service';
import { PortfolioResolver } from './portfolio.resolver';
import { PortfolioService } from './services/portfolio.service';

@Module({
  imports: [],
  providers: [PrismaService, PortfolioResolver, PortfolioService],
  exports: [],
})
export class PortfolioModule {}

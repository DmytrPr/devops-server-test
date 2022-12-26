import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [],
})
export class DatabaseModule {}

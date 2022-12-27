import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../database/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  getAll(): Promise<User[] | null> {
    return this.prismaService.user.findMany();
  }

  findOneById(id: User['id']): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  findOneByEmail(email: User['email']): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  findOneByUsername(
    username: User['username'],
  ): Promise<Pick<User, 'username' | 'email' | 'password'> | null> {
    return this.prismaService.user.findUnique({
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
      where: {
        username,
      },
    });
  }

  create(user: User): Promise<User | null> {
    return this.prismaService.user.create({
      data: user,
    });
  }

  update(newUser: Partial<User> & Pick<User, 'id'>): Promise<User | null> {
    return this.prismaService.user.update({
      data: newUser,
      where: {
        id: newUser.id,
      },
    });
  }
}

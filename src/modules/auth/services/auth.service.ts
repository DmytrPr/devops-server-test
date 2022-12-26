import * as argon from 'argon2';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  private comparePassword(pass: string, hash: string) {
    return argon.verify(hash, pass);
  }

  private hashPassword(password) {
    return argon.hash(password);
  }

  async validateUser(username: User['username'], pass: string) {
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      return null;
    }

    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }
    const { password, ...result } = user;
    return result;
  }

  public login(user) {
    return this.validateUser(user.username, user.password);
  }

  public async create(user) {
    const pass = await this.hashPassword(user.password);
    const newUser = await this.userService.create({ ...user, password: pass });
    const { password, ...result } = newUser;

    return result;
  }

  public async updatePassword(userId: User['id'], newPassword: string) {
    const password = await this.hashPassword(newPassword);
    return await this.userService.update({ id: userId, password });
  }
}

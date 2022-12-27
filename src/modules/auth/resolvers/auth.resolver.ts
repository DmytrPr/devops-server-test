import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { DoesUserExist } from 'src/guards/doesUserExist.guard';
import { LoginGuard } from 'src/guards/login.guard';
import { Environment } from 'src/interfaces/environment.interface';
import { UserLoginDTO, UserRegDTO } from 'src/modules/user/dto/user-auth.dto';
import { User as UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';
import { SessionContext } from 'src/types';
import { AuthService } from '../services/auth.service';

@Resolver(UserEntity)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService<Environment>,
  ) {}

  @Mutation(() => UserEntity)
  @UseGuards(DoesUserExist)
  register(
    @Args('options') options: UserRegDTO,
  ): Promise<Omit<User, 'password'>> {
    return this.authService.create(options);
  }

  @Mutation(() => UserEntity)
  @UseGuards(LoginGuard)
  login(
    @Args('options') options: UserLoginDTO,
    @Context() ctx: SessionContext,
  ): Omit<User, 'password'> {
    return ctx.req.user as Omit<User, 'password'>;
  }

  @Mutation(() => Boolean)
  logout(@Context() { req, res }: SessionContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(this.configService.get('AUTH_COOKIE'));
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      }),
    );
  }

  @Query(() => UserEntity, { nullable: true })
  me(@Context() ctx: SessionContext) {
    const usr = ctx.req.user as User;
    if (!usr) {
      return null;
    }

    return this.userService.findOneById(usr.id);
  }
}

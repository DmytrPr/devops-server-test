import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/modules/user/user.service';
import { ArgumentValidationError } from 'type-graphql';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async validateRequest(req) {
    const userExistByEmail = await this.userService.findOneByEmail(req.email);
    if (userExistByEmail) {
      throw new ArgumentValidationError([
        {
          property: 'email',
          constraints: {
            unique: 'Email is already in use',
          },
        },
      ]);
    }

    const userExistByUsername = await this.userService.findOneByUsername(
      req.username,
    );

    if (userExistByUsername) {
      throw new ArgumentValidationError([
        {
          property: 'username',
          constraints: {
            unique: 'Username is already in use',
          },
        },
      ]);
    }

    return true;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { options } = context.getArgByIndex(1);
    return this.validateRequest(options);
  }
}

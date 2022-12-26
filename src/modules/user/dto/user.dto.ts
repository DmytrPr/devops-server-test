import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class UserRegDTO {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

@InputType()
export class UserLoginDTO {
  @Field({ nullable: false })
  @IsNotEmpty()
  username!: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  password!: string;
}

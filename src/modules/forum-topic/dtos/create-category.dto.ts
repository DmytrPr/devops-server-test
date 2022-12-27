import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateCategoryDTO {
  @Field()
  @IsString()
  @MaxLength(32)
  title: string;

  @Field()
  @IsOptional()
  @IsString()
  @MaxLength(32)
  subTitle?: string;
}

import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, MaxLength, IsOptional, IsInt } from 'class-validator';

@InputType()
export class CreateTopicDTO {
  @Field()
  @IsOptional()
  @IsString()
  @MaxLength(64)
  content: string;

  @Field(() => Int)
  @IsInt()
  categoryId: number;
}

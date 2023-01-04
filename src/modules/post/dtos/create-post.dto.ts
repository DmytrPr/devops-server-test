import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, MaxLength, IsOptional, IsNumber } from 'class-validator';

@InputType()
export class CreatePostDTO {
  @Field()
  @IsOptional()
  @IsString()
  @MaxLength(512)
  content: string;

  @Field(() => Int)
  @IsNumber()
  topicId: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  parentId: number;
}

import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, IsOptional, IsNumber } from 'class-validator';

@InputType()
export class CreatePostDTO {
  @Field()
  @IsOptional()
  @IsString()
  @MaxLength(512)
  content: string;

  @Field()
  @IsNumber()
  topicId: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  parentId: number;
}

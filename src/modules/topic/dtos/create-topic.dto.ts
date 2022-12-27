import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, IsOptional, IsNumber } from 'class-validator';

@InputType()
export class CreateTopicDTO {
  @Field()
  @IsOptional()
  @IsString()
  @MaxLength(64)
  content: string;

  @Field()
  @IsNumber()
  categoryId: number;
}

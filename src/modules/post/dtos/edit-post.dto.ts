import { Field, InputType } from '@nestjs/graphql';
import { PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreatePostDTO } from './create-post.dto';

@InputType()
export class EditPostDTO extends PickType(CreatePostDTO, ['content'] as const) {
  @Field()
  @IsNumber()
  id: number;
}

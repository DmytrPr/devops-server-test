import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateTopicDTO } from './create-topic.dto';

@InputType()
export class EditTopicDTO extends PartialType(CreateTopicDTO) {
  @Field()
  @IsNumber()
  id: number;
}

import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateCategoryDTO } from './create-category.dto';

@InputType()
export class EditCategoryDTO extends PartialType(CreateCategoryDTO) {
  @Field()
  @IsNumber()
  id: number;
}

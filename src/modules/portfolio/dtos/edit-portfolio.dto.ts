import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreatePortfolioDTO } from './create-portfolio.dto';

@InputType()
export class EditPortfolioDTO extends PartialType(CreatePortfolioDTO) {
  @Field()
  @IsNumber()
  id: number;
}

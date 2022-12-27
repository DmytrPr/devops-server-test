import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePortfolioDTO {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  company: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(512)
  description: string;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  endDate?: string;
}

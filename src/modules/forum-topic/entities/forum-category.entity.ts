import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Topic } from 'src/modules/topic/entities/topic.entity';

@ObjectType()
export class ForumCategory {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  subTitle?: string;

  @Field(() => [Topic])
  topics: Topic[];
}

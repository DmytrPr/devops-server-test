import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Topic } from 'src/modules/topic/entities/topic.entity';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  content: string;

  @Field(() => User)
  user: User;

  @Field(() => Topic)
  topic: Topic;

  @Field(() => Int, { nullable: true })
  parentId?: number;

  @Field({ nullable: true })
  parent?: Post;

  @Field(() => [Post])
  children: Post[];
}

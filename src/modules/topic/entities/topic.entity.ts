import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ForumCategory } from 'src/modules/forum-topic/entities/forum-category.entity';
import { Post } from 'src/modules/post/entities/post.entity';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class Topic {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  content: string;

  @Field(() => User)
  user: User;

  @Field(() => ForumCategory)
  forumCategory: ForumCategory;

  @Field(() => [Post])
  posts: Post[];
}

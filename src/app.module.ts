import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import { ArgumentValidationError } from 'type-graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PROD } from './constants';
import { AuthModule } from './modules/auth/auth.module';
import { redis } from './modules/redis';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { UserModule } from './modules/user/user.module';
import { ForumCategoryModule } from './modules/forum-topic/forum-category.module';
import { TopicModule } from './modules/topic/topic.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: !PROD,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error: GraphQLError): GraphQLFormattedError => {
        if (error.originalError instanceof ApolloError) {
          return error;
        }

        if (error.originalError instanceof ArgumentValidationError) {
          const { extensions, locations, message, path } = error;

          error.extensions.code = 'GRAPHQL_VALIDATION_FAILED';

          return {
            extensions,
            locations,
            message,
            path,
          };
        }

        return error;
      },
      cors: {
        origin: 'http://localhost:4000',
        credentials: true,
      },
      context: ({ req, res }) => ({
        req,
        res,
        redis,
      }),
    }),
    AuthModule,
    PortfolioModule,
    UserModule,
    ForumCategoryModule,
    TopicModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

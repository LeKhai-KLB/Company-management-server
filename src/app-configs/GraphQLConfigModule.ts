import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigService } from "@nestjs/config";

export const GraphQLConfigModule =
  GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const GRAPHQL_ORIGIN: string | boolean =
        configService.get("GRAPHQL_ORIGIN") || true;
      return {
        autoSchemaFile: true,
        cors: {
          origin: GRAPHQL_ORIGIN,
          credentials: true,
        },
        context: ({ req, res }) => ({ req, res }),
      };
    },
  });

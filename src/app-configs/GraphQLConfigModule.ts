import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigService } from "@nestjs/config";
import { CONFIG_KEY } from "~/constants/app.constants";

export const GraphQLConfigModule =
  GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const CLIENT_ORIGIN: string | boolean =
        configService.get(CONFIG_KEY.CLIENT_ORIGIN) || true;
      return {
        autoSchemaFile: true,
        cors: {
          origin: CLIENT_ORIGIN,
          credentials: true,
        },
        context: ({ req, res }) => ({ req, res }),
      };
    },
  });

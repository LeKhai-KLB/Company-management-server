import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { ENVIRONMENT, CONFIG_KEY } from "~/constants/app.constants";
import { URL } from "url";

const dynamicTypeORMConfig = (configService: ConfigService) => {
  const stage = process.env.STAGE;
  switch (stage) {
    case ENVIRONMENT.DEV:
      return {
        type: "postgres",
        host: configService.get(CONFIG_KEY.POSTGRES_HOST),
        port: configService.get(CONFIG_KEY.POSTGRES_POST),
        username: configService.get(CONFIG_KEY.POSTGRES_USERNAME),
        password: configService.get(CONFIG_KEY.POSTGRES_PASSWORD),
        database: configService.get(CONFIG_KEY.POSTGRES_DATABASE),
        autoLoadEntities: true,
        synchronize: true,
      };
    case ENVIRONMENT.STAGING:
      const dbURL = new URL(configService.get(CONFIG_KEY.COCKROACHDB_URL));
      const routingId = dbURL.searchParams.get("options");
      dbURL.searchParams.delete("options");
      return {
        type: "cockroachdb",
        url: dbURL.toString(),
        ssl: true,
        extra: {
          options: routingId,
        },
        synchronize: true,
        // logging: true,
        autoLoadEntities: true,
        entities: ["features/**/entity/*.entity.ts"],
      };
    default:
      return {};
  }
};

export const TypeORMConfigModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const baseConfig = dynamicTypeORMConfig(
      configService,
    ) as TypeOrmModuleOptions;
    Object.assign(baseConfig, {
      extra: {
        poolSize: 20,
        connectionTimeoutMillis: 3000,
      },
    });
    return baseConfig;
  },
});

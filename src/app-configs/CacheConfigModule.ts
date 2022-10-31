import { ConfigService } from "@nestjs/config";
import { CacheModule } from "@nestjs/common";
import type { ClientOpts } from "redis";
import * as redisStore from "cache-manager-redis-store";
import { ENVIRONMENT, CONFIG_KEY } from "~/constants/app.constants";

const dynamicCacheConfig = (configService: ConfigService) => {
  const stage = process.env.STAGE;
  switch (stage) {
    case ENVIRONMENT.DEV:
      return {
        store: redisStore,
        host: configService.get(CONFIG_KEY.REDIS_HOST),
        port: configService.get(CONFIG_KEY.REDIS_PORT),
        isGlobal: true,
      };
    case ENVIRONMENT.STAGING:
      return {
        store: redisStore,
        url: configService.get(CONFIG_KEY.REDIS_URL),
        username: configService.get(CONFIG_KEY.REDIS_USERNAME),
        password: configService.get(CONFIG_KEY.REDIS_PASSWORD),
        isGlobal: true,
      };
    default:
      return {};
  }
};

export const CacheConfigModule = CacheModule.registerAsync<ClientOpts>({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const config = dynamicCacheConfig(configService);
    return config;
  },
});

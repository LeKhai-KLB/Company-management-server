import { ConfigService } from "@nestjs/config";
import { CacheModule } from "@nestjs/common";
import type { ClientOpts } from "redis";
import * as redisStore from "cache-manager-redis-store";

export const CacheConfigModule = CacheModule.registerAsync<ClientOpts>({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      store: redisStore,
      host: configService.get("REDIS_HOST"),
      port: configService.get("REDIS_PORT"),
      isGlobal: true,
    };
  },
});

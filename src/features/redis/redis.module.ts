import { Global, Module } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { CacheConfigModule } from "~app-configs/CacheConfigModule";

@Global()
@Module({
  imports: [CacheConfigModule],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}

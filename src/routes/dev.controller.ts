import { Controller, Get, Inject } from "@nestjs/common";
import { RedisService } from "~features/redis/redis.service";

@Controller("dev")
export class DevController {
  constructor(
    @Inject(RedisService) private readonly redisService: RedisService,
  ) {}

  @Get("/clear-redis")
  clearAllRedisStore() {
    return this.redisService.reset();
  }

  @Get("/get-all-redis")
  getAllRedisStore() {
    return this.redisService.keys();
  }
}

import { Injectable, Inject, CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager-redis-store";
import { execWithCatch } from "~/utils/execWithCatch";

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async set(
    key: string,
    value: string | number,
    options?: Record<string, any>,
  ) {
    await execWithCatch(async () => {
      await this.cacheManager.set(key, value, options);
    });
  }

  async get(key: string) {
    const [result] = await execWithCatch(async () => {
      return await this.cacheManager.get(key);
    });
    return result;
  }

  async reset() {
    const [result] = await execWithCatch(async () => {
      return await this.cacheManager.reset();
    });
    return result;
  }

  async del(key: string | number) {
    const [result] = await execWithCatch(async () => {
      return await this.cacheManager.del(key);
    });
    return result;
  }

  async keys(pattern?: string, callback?: any) {
    const [results] = await execWithCatch(async () => {
      return this.cacheManager.keys(pattern, callback);
    });
    return results;
  }
}

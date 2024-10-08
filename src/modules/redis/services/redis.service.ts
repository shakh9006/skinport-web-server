import { SetOptions } from "redis";
import { client } from "../../../cache/redis";

class RedisService {
  async set(key: string, data: any, expire: number = 3600) {
    if (typeof data !== "string") {
      data = JSON.stringify(data);
    }

    const options: SetOptions = { EX: expire };
    await client.set(key, data, options);
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await client.get(key);
    if (data) {
      return JSON.parse(data) as T;
    }

    return null;
  }
}

export default RedisService;

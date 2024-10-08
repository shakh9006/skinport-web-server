"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../../cache/redis");
class RedisService {
    async set(key, data, expire = 3600) {
        if (typeof data !== "string") {
            data = JSON.stringify(data);
        }
        const options = { EX: expire };
        await redis_1.client.set(key, data, options);
    }
    async get(key) {
        const data = await redis_1.client.get(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }
}
exports.default = RedisService;

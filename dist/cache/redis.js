"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
exports.connectRedis = connectRedis;
const redis_1 = require("redis");
const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = Number(process.env.REDIS_PORT) || 6379;
const client = (0, redis_1.createClient)({ url: `redis://${redisHost}:${redisPort}` });
exports.client = client;
client.on("error", (err) => {
    console.error("Redis Client Error", err);
});
async function connectRedis() {
    try {
        await client.connect();
        console.log("Connected to Redis");
    }
    catch (err) {
        console.error("Failed to connect to Redis:", err);
    }
}

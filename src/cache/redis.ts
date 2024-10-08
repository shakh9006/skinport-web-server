import { createClient } from "redis";

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = Number(process.env.REDIS_PORT) || 6379;

const client = createClient({ url: `redis://${redisHost}:${redisPort}` });

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

async function connectRedis() {
  try {
    await client.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
}

export { client, connectRedis };

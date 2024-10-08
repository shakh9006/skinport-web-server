import { Router } from "express";
import ItemsController from "../controllers/items.controller";
import ItemService from "../services/item.service";
import RedisService from "../../redis/services/redis.service";

const router = Router();

const redisService = new RedisService();
const itemService = new ItemService(redisService);
const itemController = new ItemsController(itemService);

router.get("/", itemController.getItems);

export default router;

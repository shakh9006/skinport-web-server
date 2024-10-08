"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const items_controller_1 = __importDefault(require("../controllers/items.controller"));
const item_service_1 = __importDefault(require("../services/item.service"));
const redis_service_1 = __importDefault(require("../../redis/services/redis.service"));
const router = (0, express_1.Router)();
const redisService = new redis_service_1.default();
const itemService = new item_service_1.default(redisService);
const itemController = new items_controller_1.default(itemService);
router.get("/", itemController.getItems);
exports.default = router;

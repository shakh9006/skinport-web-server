"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class ItemService {
    constructor(redisService) {
        this.redisService = redisService;
    }
    async getSkinportItems() {
        const cachedItems = await this.redisService.get("skinport_items");
        if (cachedItems?.length) {
            return cachedItems;
        }
        const url = `${process.env.SKINPORT_API}/items`;
        const response = await axios_1.default.get(url, {
            params: {
                app_id: Number(process.env.APP_ID) || 731,
                currency: process.env.CURRENCY || "USD",
            },
        });
        const items = response.data.map((item) => ({
            name: item.market_hash_name,
            tradablePrice: item.suggested_price,
            nonTradablePrice: item.min_price,
        }));
        await this.redisService.set("skinport_items", items, 3600);
        return items;
    }
}
exports.default = ItemService;

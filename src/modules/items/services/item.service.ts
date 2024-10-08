import RedisService from "../../redis/services/redis.service";
import SkinportItemsDto from "../dto/skinport-items.dto";
import axios from "axios";

class ItemService {
  constructor(private redisService: RedisService) {}

  async getSkinportItems() {
    const cachedItems =
      await this.redisService.get<SkinportItemsDto[]>("skinport_items");

    if (cachedItems?.length) {
      return cachedItems;
    }

    const url: string = `${process.env.SKINPORT_API}/items`;
    const response = await axios.get(url, {
      params: {
        app_id: Number(process.env.APP_ID) || 731,
        currency: process.env.CURRENCY || "USD",
      },
    });

    const items: SkinportItemsDto = response.data.map((item: any) => ({
      name: item.market_hash_name,
      tradablePrice: item.suggested_price,
      nonTradablePrice: item.min_price,
    }));

    await this.redisService.set("skinport_items", items, 3600);
    return items;
  }
}

export default ItemService;

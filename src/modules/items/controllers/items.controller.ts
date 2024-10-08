import { NextFunction, Request, Response } from "express";
import ItemService from "../services/item.service";

class ItemsController {
  constructor(private itemServices: ItemService) {
    this.getItems = this.getItems.bind(this);
  }

  async getItems(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const items = await this.itemServices.getSkinportItems();
      res.status(200).send({
        message: "Got items successfully",
        data: items,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default ItemsController;

import { Request, Response, NextFunction } from "express";
import CreatePurchaseDto from "../dto/create-purchase.dto";
import PurchaseService from "../services/purchase.service";

class PurchaseController {
  constructor(private purchaseService: PurchaseService) {
    this.createPurchase = this.createPurchase.bind(this);
  }

  async createPurchase(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = Number(req.body.userId);
      const price = Number(req.body.price);
      const itemId = req.body.itemId;

      const createPurchaseDto: CreatePurchaseDto = { userId, price, itemId };
      const purchase =
        await this.purchaseService.createPurchase(createPurchaseDto);

      res.status(201).send({
        message: "Purchase created",
        purchase,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default PurchaseController;

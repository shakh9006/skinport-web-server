"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PurchaseController {
    constructor(purchaseService) {
        this.purchaseService = purchaseService;
        this.createPurchase = this.createPurchase.bind(this);
    }
    async createPurchase(req, res, next) {
        try {
            const userId = Number(req.body.userId);
            const price = Number(req.body.price);
            const itemId = req.body.itemId;
            const createPurchaseDto = { userId, price, itemId };
            const purchase = await this.purchaseService.createPurchase(createPurchaseDto);
            res.status(201).send({
                message: "Purchase created",
                purchase,
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = PurchaseController;

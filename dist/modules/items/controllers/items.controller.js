"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ItemsController {
    constructor(itemServices) {
        this.itemServices = itemServices;
        this.getItems = this.getItems.bind(this);
    }
    async getItems(req, res, next) {
        try {
            const items = await this.itemServices.getSkinportItems();
            res.status(200).send({
                message: "Got items successfully",
                data: items,
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = ItemsController;

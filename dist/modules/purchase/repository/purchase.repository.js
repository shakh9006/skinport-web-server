"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRepository = void 0;
const prisma_client_1 = require("../../../database/prisma.client");
class PurchaseRepository {
    async create(data) {
        return await prisma_client_1.prisma.purchase.create({
            data: {
                itemId: data.itemId,
                price: data.price,
                user: {
                    connect: {
                        id: data.userId,
                    },
                },
            },
        });
    }
}
exports.PurchaseRepository = PurchaseRepository;
exports.default = PurchaseRepository;

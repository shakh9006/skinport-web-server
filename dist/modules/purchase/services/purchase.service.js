"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseService = void 0;
const http_error_exception_1 = require("../../../exceptions/http-error.exception");
const prisma_client_1 = require("../../../database/prisma.client");
class PurchaseService {
    constructor(purchaseRepository, userService) {
        this.purchaseRepository = purchaseRepository;
        this.userService = userService;
    }
    async createPurchase(data) {
        if (!data.price || !data.userId || !data.itemId) {
            throw http_error_exception_1.HttpErrorException.BadRequest("Invalid input data");
        }
        const user = await this.userService.getUserById(data.userId);
        if (!user) {
            throw http_error_exception_1.HttpErrorException.BadRequest("User not found");
        }
        if (user.balance < data.price) {
            throw new Error("Insufficient balance");
        }
        return await prisma_client_1.prisma.$transaction([
            prisma_client_1.prisma.user.update({
                where: { id: data.userId },
                data: { balance: user.balance - data.price },
            }),
            prisma_client_1.prisma.purchase.create({
                data: {
                    itemId: data.itemId.toString(),
                    price: data.price,
                    user: {
                        connect: {
                            id: data.userId,
                        },
                    },
                },
            }),
        ]);
    }
}
exports.PurchaseService = PurchaseService;
exports.default = PurchaseService;

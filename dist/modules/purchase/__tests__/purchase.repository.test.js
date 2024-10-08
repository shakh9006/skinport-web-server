"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../../../database/prisma.client");
const purchase_repository_1 = __importDefault(require("../repository/purchase.repository"));
jest.mock("../../../database/prisma.client", () => ({
    prisma: {
        purchase: {
            create: jest.fn(),
        },
    },
}));
describe("PurchaseRepository", () => {
    let purchaseRepository;
    beforeEach(() => {
        purchaseRepository = new purchase_repository_1.default();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("create", () => {
        it("should create a new purchase", async () => {
            const createPurchaseDto = {
                itemId: "1",
                price: 500,
                userId: 2,
            };
            const mockPurchase = {
                id: 1,
                itemId: createPurchaseDto.itemId.toString(),
                price: createPurchaseDto.price,
                userId: createPurchaseDto.userId,
            };
            prisma_client_1.prisma.purchase.create.mockResolvedValue(mockPurchase);
            const result = await purchaseRepository.create(createPurchaseDto);
            expect(result).toEqual(mockPurchase);
            expect(prisma_client_1.prisma.purchase.create).toHaveBeenCalledWith({
                data: {
                    itemId: createPurchaseDto.itemId,
                    price: createPurchaseDto.price,
                    user: {
                        connect: { id: createPurchaseDto.userId },
                    },
                },
            });
        });
        it("should throw an error if purchase creation fails", async () => {
            const createPurchaseDto = {
                itemId: "1",
                price: 500,
                userId: 2,
            };
            prisma_client_1.prisma.purchase.create.mockRejectedValue(new Error("Creation failed"));
            await expect(purchaseRepository.create(createPurchaseDto)).rejects.toThrow("Creation failed");
            expect(prisma_client_1.prisma.purchase.create).toHaveBeenCalledWith({
                data: {
                    itemId: createPurchaseDto.itemId,
                    price: createPurchaseDto.price,
                    user: {
                        connect: { id: createPurchaseDto.userId },
                    },
                },
            });
        });
    });
});

import { prisma } from "../../../database/prisma.client";
import PurchaseRepository from "../repository/purchase.repository";
import CreatePurchaseDto from "../dto/create-purchase.dto";

jest.mock("../../../database/prisma.client", () => ({
  prisma: {
    purchase: {
      create: jest.fn(),
    },
  },
}));

describe("PurchaseRepository", () => {
  let purchaseRepository: PurchaseRepository;

  beforeEach(() => {
    purchaseRepository = new PurchaseRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a new purchase", async () => {
      const createPurchaseDto: CreatePurchaseDto = {
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

      (prisma.purchase.create as jest.Mock).mockResolvedValue(mockPurchase);

      const result = await purchaseRepository.create(createPurchaseDto);

      expect(result).toEqual(mockPurchase);
      expect(prisma.purchase.create).toHaveBeenCalledWith({
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
      const createPurchaseDto: CreatePurchaseDto = {
        itemId: "1",
        price: 500,
        userId: 2,
      };

      (prisma.purchase.create as jest.Mock).mockRejectedValue(
        new Error("Creation failed"),
      );

      await expect(
        purchaseRepository.create(createPurchaseDto),
      ).rejects.toThrow("Creation failed");

      expect(prisma.purchase.create).toHaveBeenCalledWith({
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

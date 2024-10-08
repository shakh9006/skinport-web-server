import { PurchaseService } from "../services/purchase.service";
import { PurchaseRepository } from "../repository/purchase.repository";
import CreatePurchaseDto from "../dto/create-purchase.dto";
import UserService from "../../user/services/user.service";
import { HttpErrorException } from "../../../exceptions/http-error.exception";
import UserRepository from "../../user/repositories/user.repository";
import { prisma } from "../../../database/prisma.client";

jest.mock("../../user/repositories/user.repository");
jest.mock("../repository/purchase.repository");
jest.mock("../../user/services/user.service");

describe("PurchaseService", () => {
  let purchaseService: PurchaseService;
  let purchaseRepository: jest.Mocked<PurchaseRepository>;
  let userRepository: UserRepository;
  let userService: jest.Mocked<UserService>;

  beforeEach(() => {
    purchaseRepository =
      new PurchaseRepository() as jest.Mocked<PurchaseRepository>;
    userRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(userRepository) as jest.Mocked<UserService>;
    purchaseService = new PurchaseService(purchaseRepository, userService);
    jest.clearAllMocks();
  });

  describe("createPurchase", () => {
    it("should throw an error if input data is invalid", async () => {
      const createPurchaseDto: CreatePurchaseDto = {
        itemId: null,
        price: 100,
        userId: 2,
      };

      await expect(
        purchaseService.createPurchase(createPurchaseDto),
      ).rejects.toThrow(HttpErrorException.BadRequest("Invalid input data"));
    });

    it("should throw an error if user is not found", async () => {
      const createPurchaseDto: CreatePurchaseDto = {
        itemId: "1",
        price: 100,
        userId: 2,
      };

      userService.getUserById.mockResolvedValue(null);

      await expect(
        purchaseService.createPurchase(createPurchaseDto),
      ).rejects.toThrow(HttpErrorException.BadRequest("User not found"));
    });

    it("should throw an error if user has insufficient balance", async () => {
      const createPurchaseDto: CreatePurchaseDto = {
        itemId: "1",
        price: 100,
        userId: 2,
      };

      const mockUser = {
        id: createPurchaseDto.userId,
        balance: 50,
      };

      userService.getUserById.mockResolvedValue(mockUser);

      await expect(
        purchaseService.createPurchase(createPurchaseDto),
      ).rejects.toThrow("Insufficient balance");
    });
  });
});

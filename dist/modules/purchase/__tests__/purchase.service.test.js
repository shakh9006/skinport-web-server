"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const purchase_service_1 = require("../services/purchase.service");
const purchase_repository_1 = require("../repository/purchase.repository");
const user_service_1 = __importDefault(require("../../user/services/user.service"));
const http_error_exception_1 = require("../../../exceptions/http-error.exception");
const user_repository_1 = __importDefault(require("../../user/repositories/user.repository"));
jest.mock("../../user/repositories/user.repository");
jest.mock("../repository/purchase.repository");
jest.mock("../../user/services/user.service");
describe("PurchaseService", () => {
    let purchaseService;
    let purchaseRepository;
    let userRepository;
    let userService;
    beforeEach(() => {
        purchaseRepository =
            new purchase_repository_1.PurchaseRepository();
        userRepository = new user_repository_1.default();
        userService = new user_service_1.default(userRepository);
        purchaseService = new purchase_service_1.PurchaseService(purchaseRepository, userService);
        jest.clearAllMocks();
    });
    describe("createPurchase", () => {
        it("should throw an error if input data is invalid", async () => {
            const createPurchaseDto = {
                itemId: null,
                price: 100,
                userId: 2,
            };
            await expect(purchaseService.createPurchase(createPurchaseDto)).rejects.toThrow(http_error_exception_1.HttpErrorException.BadRequest("Invalid input data"));
        });
        it("should throw an error if user is not found", async () => {
            const createPurchaseDto = {
                itemId: "1",
                price: 100,
                userId: 2,
            };
            userService.getUserById.mockResolvedValue(null);
            await expect(purchaseService.createPurchase(createPurchaseDto)).rejects.toThrow(http_error_exception_1.HttpErrorException.BadRequest("User not found"));
        });
        it("should throw an error if user has insufficient balance", async () => {
            const createPurchaseDto = {
                itemId: "1",
                price: 100,
                userId: 2,
            };
            const mockUser = {
                id: createPurchaseDto.userId,
                balance: 50,
            };
            userService.getUserById.mockResolvedValue(mockUser);
            await expect(purchaseService.createPurchase(createPurchaseDto)).rejects.toThrow("Insufficient balance");
        });
    });
});

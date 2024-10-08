"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const purchase_controller_1 = __importDefault(require("../controllers/purchase.controller"));
const purchase_service_1 = __importDefault(require("../services/purchase.service"));
jest.mock("../services/purchase.service");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const purchaseService = new purchase_service_1.default(null, null);
const purchaseController = new purchase_controller_1.default(purchaseService);
app.post("/api/v1/purchase/", purchaseController.createPurchase);
describe("PurchaseController e2e tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should create a purchase successfully", async () => {
        const createPurchaseDto = {
            userId: 1,
            price: 100,
            itemId: 2,
        };
        const mockPurchase = {
            id: 1,
            ...createPurchaseDto,
        };
        purchaseService.createPurchase.mockResolvedValue(mockPurchase);
        const response = await (0, supertest_1.default)(app)
            .post("/api/v1/purchase/")
            .send(createPurchaseDto)
            .expect(201);
        expect(response.body).toEqual({
            message: "Purchase created",
            purchase: mockPurchase,
        });
        expect(purchaseService.createPurchase).toHaveBeenCalledWith(createPurchaseDto);
    });
});

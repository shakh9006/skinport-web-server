import request from "supertest";
import express from "express";
import PurchaseController from "../controllers/purchase.controller";
import PurchaseService from "../services/purchase.service";

jest.mock("../services/purchase.service");

const app = express();
app.use(express.json());

const purchaseService = new PurchaseService(null, null);
const purchaseController = new PurchaseController(purchaseService);
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

    (purchaseService.createPurchase as jest.Mock).mockResolvedValue(
      mockPurchase,
    );

    const response = await request(app)
      .post("/api/v1/purchase/")
      .send(createPurchaseDto)
      .expect(201);

    expect(response.body).toEqual({
      message: "Purchase created",
      purchase: mockPurchase,
    });
    expect(purchaseService.createPurchase).toHaveBeenCalledWith(
      createPurchaseDto,
    );
  });
});

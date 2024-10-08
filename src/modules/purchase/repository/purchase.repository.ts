import CreatePurchaseDto from "../dto/create-purchase.dto";
import { Purchase } from "@prisma/client";
import { prisma } from "../../../database/prisma.client";

export class PurchaseRepository {
  async create(data: CreatePurchaseDto): Promise<Purchase> {
    return await prisma.purchase.create({
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

export default PurchaseRepository;

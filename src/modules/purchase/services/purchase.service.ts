import { PurchaseRepository } from "../repository/purchase.repository";
import CreatePurchaseDto from "../dto/create-purchase.dto";
import { Purchase, User } from "@prisma/client";
import { HttpErrorException } from "../../../exceptions/http-error.exception";
import UserService from "../../user/services/user.service";
import { prisma } from "../../../database/prisma.client";

export class PurchaseService {
  constructor(
    private purchaseRepository: PurchaseRepository,
    private userService: UserService,
  ) {}

  async createPurchase(data: CreatePurchaseDto): Promise<[User, Purchase]> {
    if (!data.price || !data.userId || !data.itemId) {
      throw HttpErrorException.BadRequest("Invalid input data");
    }

    const user = await this.userService.getUserById(data.userId);
    if (!user) {
      throw HttpErrorException.BadRequest("User not found");
    }

    if (user.balance < data.price) {
      throw new Error("Insufficient balance");
    }

    return await prisma.$transaction([
      prisma.user.update({
        where: { id: data.userId },
        data: { balance: user.balance - data.price },
      }),
      prisma.purchase.create({
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

export default PurchaseService;

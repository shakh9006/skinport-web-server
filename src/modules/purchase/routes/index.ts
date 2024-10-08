import { Router } from "express";
import UserRepository from "../../user/repositories/user.repository";
import UserService from "../../user/services/user.service";
import PurchaseRepository from "../repository/purchase.repository";
import PurchaseService from "../services/purchase.service";
import PurchaseController from "../controllers/purchase.controller";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const purchaseRepository = new PurchaseRepository();
const purchaseService = new PurchaseService(purchaseRepository, userService);
const purchaseController = new PurchaseController(purchaseService);

router.post("/", purchaseController.createPurchase);

export default router;

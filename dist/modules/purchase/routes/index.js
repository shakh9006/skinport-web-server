"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_repository_1 = __importDefault(require("../../user/repositories/user.repository"));
const user_service_1 = __importDefault(require("../../user/services/user.service"));
const purchase_repository_1 = __importDefault(require("../repository/purchase.repository"));
const purchase_service_1 = __importDefault(require("../services/purchase.service"));
const purchase_controller_1 = __importDefault(require("../controllers/purchase.controller"));
const router = (0, express_1.Router)();
const userRepository = new user_repository_1.default();
const userService = new user_service_1.default(userRepository);
const purchaseRepository = new purchase_repository_1.default();
const purchaseService = new purchase_service_1.default(purchaseRepository, userService);
const purchaseController = new purchase_controller_1.default(purchaseService);
router.post("/", purchaseController.createPurchase);
exports.default = router;

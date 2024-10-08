"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const user_service_1 = __importDefault(require("../services/user.service"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = (0, express_1.default)();
const userRepository = new user_repository_1.default();
const userService = new user_service_1.default(userRepository);
const userController = new user_controller_1.default(userService);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);
exports.default = router;

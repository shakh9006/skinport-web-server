"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const user_service_1 = __importDefault(require("../services/user.service"));
jest.mock("../services/user.service");
const mockUserService = new user_service_1.default(null);
const app = (0, express_1.default)();
app.use(express_1.default.json());
const userController = new user_controller_1.default(mockUserService);
app.post("/api/v1/user", userController.createUser);
app.get("/api/v1/user/:id", userController.getUser);
describe("UserController E2E tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("POST /api/v1/user", () => {
        it("should create a new user and return 201", async () => {
            const newUser = { id: 1, balance: 1000 };
            mockUserService.createUser.mockResolvedValue(newUser);
            const response = await (0, supertest_1.default)(app)
                .post("/api/v1/user")
                .send({ balance: 1000 })
                .expect(201);
            expect(response.body.message).toBe("User created successfully");
            expect(response.body.data).toEqual(newUser);
            expect(mockUserService.createUser).toHaveBeenCalledWith({
                balance: 1000,
            });
        });
        it("should return 400 for invalid data", async () => {
            const response = await (0, supertest_1.default)(app)
                .post("/api/v1/user")
                .send({ balance: "Invalid" })
                .expect(400);
            expect(response.body.message).toBeDefined();
        });
    });
    describe("GET /api/v1/user/:id", () => {
        it("should return user info for a valid user", async () => {
            const mockUser = { id: 1, balance: 1000 };
            mockUserService.getUserById.mockResolvedValue(mockUser);
            const response = await (0, supertest_1.default)(app).get("/api/v1/user/1").expect(200);
            expect(response.body.message).toBe("User info");
            expect(response.body.data).toEqual(mockUser);
            expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
        });
        // it("should return 404 if user not found", async () => {
        //   mockUserService.getUserById.mockResolvedValue(null);
        //
        //   const response = await request(app).get("/api/v1/user/1").expect(404);
        //
        //   expect(response.body.message).toBe("User not found");
        // });
    });
});

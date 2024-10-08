"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const prisma_client_1 = require("../../../database/prisma.client");
jest.mock("../../../database/prisma.client", () => ({
    prisma: {
        user: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findUnique: jest.fn(),
        },
    },
}));
describe("UserRepository", () => {
    let userRepository;
    beforeEach(() => {
        userRepository = new user_repository_1.default();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("create", () => {
        it("should create a new user", async () => {
            const mockUser = { id: 1, balance: 1000 };
            const createUserDto = { balance: 1000 };
            prisma_client_1.prisma.user.create.mockResolvedValue(mockUser);
            const result = await userRepository.create(createUserDto);
            expect(prisma_client_1.prisma.user.create).toHaveBeenCalledWith({
                data: { balance: createUserDto.balance },
            });
            expect(result).toEqual(mockUser);
        });
    });
    describe("update", () => {
        it("should update the user's balance", async () => {
            const mockUser = { id: 1, balance: 1500 };
            const updateUserDto = { balance: 1500 };
            prisma_client_1.prisma.user.update.mockResolvedValue(mockUser);
            const result = await userRepository.update(1, updateUserDto);
            expect(prisma_client_1.prisma.user.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { balance: updateUserDto.balance },
            });
            expect(result).toEqual(mockUser);
        });
    });
    describe("delete", () => {
        it("should delete a user by id", async () => {
            const mockUser = { id: 1, balance: 1000 };
            prisma_client_1.prisma.user.delete.mockResolvedValue(mockUser);
            const result = await userRepository.delete(1);
            expect(prisma_client_1.prisma.user.delete).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toEqual(mockUser);
        });
    });
    describe("findById", () => {
        it("should find a user by id", async () => {
            const mockUser = { id: 1, balance: 1000 };
            prisma_client_1.prisma.user.findUnique.mockResolvedValue(mockUser);
            const result = await userRepository.findById(1);
            expect(prisma_client_1.prisma.user.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toEqual(mockUser);
        });
        it("should return null if user is not found", async () => {
            prisma_client_1.prisma.user.findUnique.mockResolvedValue(null);
            const result = await userRepository.findById(1);
            expect(prisma_client_1.prisma.user.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toBeNull();
        });
    });
});

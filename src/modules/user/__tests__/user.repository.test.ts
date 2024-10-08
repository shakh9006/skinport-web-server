import UserRepository from "../repositories/user.repository";
import { prisma } from "../../../database/prisma.client";
import { CreateUserDto } from "../dto/create-user.dto";
import UpdateUserDto from "../dto/update-user.dto";
import { User } from "@prisma/client";

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
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const mockUser: User = { id: 1, balance: 1000 };
      const createUserDto: CreateUserDto = { balance: 1000 };

      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.create(createUserDto);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: { balance: createUserDto.balance },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe("update", () => {
    it("should update the user's balance", async () => {
      const mockUser: User = { id: 1, balance: 1500 };
      const updateUserDto: UpdateUserDto = { balance: 1500 };

      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.update(1, updateUserDto);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { balance: updateUserDto.balance },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe("delete", () => {
    it("should delete a user by id", async () => {
      const mockUser: User = { id: 1, balance: 1000 };

      (prisma.user.delete as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.delete(1);

      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe("findById", () => {
    it("should find a user by id", async () => {
      const mockUser: User = { id: 1, balance: 1000 };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.findById(1);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockUser);
    });

    it("should return null if user is not found", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await userRepository.findById(1);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toBeNull();
    });
  });
});

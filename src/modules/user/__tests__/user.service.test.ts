import UserService from "../services/user.service";
import UserRepository from "../repositories/user.repository";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "@prisma/client";
import UpdateUserDto from "../dto/update-user.dto";
import { HttpErrorException } from "../../../exceptions/http-error.exception";

jest.mock("../repositories/user.repository");

describe("UserService", () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  const mockUser: User = { id: 1, balance: 1000 };

  beforeEach(() => {
    userRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(userRepository);

    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const createUserDto: CreateUserDto = { balance: 1000 };

      userRepository.create.mockResolvedValue(mockUser);

      const result = await userService.createUser(createUserDto);

      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe("updateUser", () => {
    it("should update a user's balance", async () => {
      const updateUserDto: UpdateUserDto = { balance: 1500 };

      userRepository.findById.mockResolvedValue(mockUser);
      userRepository.update.mockResolvedValue({
        ...mockUser,
        balance: updateUserDto.balance,
      });

      const result = await userService.updateUser(1, updateUserDto);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.update).toHaveBeenCalledWith(1, updateUserDto);
      expect(result.balance).toBe(1500);
    });

    it("should throw an error if user is not found", async () => {
      userRepository.findById.mockResolvedValue(null);

      await expect(
        userService.updateUser(1, { balance: 1500 }),
      ).rejects.toThrow(HttpErrorException.BadRequest(`User not found`));
      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.update).not.toHaveBeenCalled();
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      userRepository.findById.mockResolvedValue(mockUser);
      userRepository.delete.mockResolvedValue(mockUser);

      const result = await userService.deleteUser(1);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });

    it("should throw an error if user is not found", async () => {
      userRepository.findById.mockResolvedValue(null);

      await expect(userService.deleteUser(1)).rejects.toThrow(
        HttpErrorException.BadRequest(`User not found`),
      );
      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.delete).not.toHaveBeenCalled();
    });
  });

  describe("getUserById", () => {
    it("should return a user by ID", async () => {
      userRepository.findById.mockResolvedValue(mockUser);

      const result = await userService.getUserById(1);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });

    it("should return null if user is not found", async () => {
      userRepository.findById.mockResolvedValue(null);

      const result = await userService.getUserById(1);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toBeNull();
    });
  });
});

import UserRepository from "../repositories/user.repository";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "@prisma/client";
import UpdateUserDto from "../dto/update-user.dto";
import { HttpErrorException } from "../../../exceptions/http-error.exception";

class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return await this.userRepository.create(data);
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User | never> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw HttpErrorException.BadRequest(`User not found`);
    }

    return await this.userRepository.update(id, data);
  }

  async deleteUser(id: number): Promise<User | never> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw HttpErrorException.BadRequest(`User not found`);
    }

    return await this.userRepository.delete(id);
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }
}

export default UserService;

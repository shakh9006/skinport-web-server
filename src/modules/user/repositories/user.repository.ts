import { CreateUserDto } from "../dto/create-user.dto";
import { prisma } from "../../../database/prisma.client";
import { User } from "@prisma/client";
import UpdateUserDto from "../dto/update-user.dto";

class UserRepository {
  async create(data: CreateUserDto): Promise<User> {
    return await prisma.user.create({
      data: {
        balance: data.balance,
      },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: { balance: data.balance },
    });
  }

  async delete(id: number): Promise<User> {
    return await prisma.user.delete({ where: { id } });
  }

  async findById(id: number): Promise<User> {
    return await prisma.user.findUnique({ where: { id } });
  }
}

export default UserRepository;

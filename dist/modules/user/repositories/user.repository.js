"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../../../database/prisma.client");
class UserRepository {
    async create(data) {
        return await prisma_client_1.prisma.user.create({
            data: {
                balance: data.balance,
            },
        });
    }
    async update(id, data) {
        return await prisma_client_1.prisma.user.update({
            where: { id },
            data: { balance: data.balance },
        });
    }
    async delete(id) {
        return await prisma_client_1.prisma.user.delete({ where: { id } });
    }
    async findById(id) {
        return await prisma_client_1.prisma.user.findUnique({ where: { id } });
    }
}
exports.default = UserRepository;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_error_exception_1 = require("../../../exceptions/http-error.exception");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(data) {
        return await this.userRepository.create(data);
    }
    async updateUser(id, data) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw http_error_exception_1.HttpErrorException.BadRequest(`User not found`);
        }
        return await this.userRepository.update(id, data);
    }
    async deleteUser(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw http_error_exception_1.HttpErrorException.BadRequest(`User not found`);
        }
        return await this.userRepository.delete(id);
    }
    async getUserById(id) {
        return await this.userRepository.findById(id);
    }
}
exports.default = UserService;

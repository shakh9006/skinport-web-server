"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.getUser = this.getUser.bind(this);
        this.createUser = this.createUser.bind(this);
    }
    async getUser(req, res, next) {
        try {
            const id = Number(req.params.id);
            const user = await this.userService.getUserById(id);
            res.status(200).send({
                message: "User info",
                data: user,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async createUser(req, res, next) {
        try {
            const balance = +req.body.balance;
            if (Number.isNaN(balance)) {
                res.status(400).send({
                    message: "Invalid input data",
                });
            }
            const userCreateDto = { balance };
            const user = await this.userService.createUser(userCreateDto);
            res.status(201).send({
                message: "User created successfully",
                data: user,
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = UserController;

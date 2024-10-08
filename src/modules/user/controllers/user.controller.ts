import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { HttpErrorException } from "../../../exceptions/http-error.exception";

class UserController {
  constructor(private userService: UserService) {
    this.getUser = this.getUser.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async getUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.getUserById(id);
      res.status(200).send({
        message: "User info",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const balance = +req.body.balance;

      if (Number.isNaN(balance)) {
        res.status(400).send({
          message: "Invalid input data",
        });
      }

      const userCreateDto: CreateUserDto = { balance };
      const user = await this.userService.createUser(userCreateDto);
      res.status(201).send({
        message: "User created successfully",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;

import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { HttpErrorException } from "../exceptions/http-error.exception";
import httpErrorHandlerMiddleware from "../middlewares/http-error-handler.middleware";
import userRoutes from "../modules/user/routes";
import itemsRoutes from "../modules/items/routes";
import purchaseRoutes from "../modules/purchase/routes";
import { connectRedis } from "../cache/redis";

export default function generateServer(): Application {
  connectRedis();

  const app: Application = express();
  app.use(express.json());
  app.use(cookieParser());

  app.get("/ping", (req: Request, res: Response) => {
    res.send({
      message: "pong",
    });
  });

  app.use("/api/v1/items", itemsRoutes);
  app.use("/api/v1/purchase", purchaseRoutes);

  //
  app.use("/api/v1/user", userRoutes);

  app.all("*", (req: Request, res: Response) => {
    res.status(404).send({ message: "Not found" });
  });

  app.use(
    httpErrorHandlerMiddleware as (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => void,
  );

  return app;
}

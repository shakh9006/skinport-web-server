import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { HttpErrorException } from "../exceptions/http-error.exception";
import { httpErrorHandlerMiddleware } from "../middlewares/http-error-handler.middleware";

export default function generateServer(): Application {
  const app: Application = express();
  app.use(express.json());
  app.use(cookieParser());

  app.get("/ping", (req: Request, res: Response) => {
    res.send({
      message: "pong",
    });
  });

  app.all("*", () => {
    throw HttpErrorException.NotFound();
  });

  app.use(httpErrorHandlerMiddleware);

  return app;
}

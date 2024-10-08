import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";

export default function generateServer(): Application {
  const app: Application = express();
  app.use(express.json());
  app.use(cookieParser());

  app.get("/ping", (req: Request, res: Response) => {
    res.send({
      message: "pong",
    });
  });

  return app;
}

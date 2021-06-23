import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import { router } from "./routes";

import "./database";

// @types/express
const app = express();
const port = 3000;

app.use(express.json());

app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }

    return response
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

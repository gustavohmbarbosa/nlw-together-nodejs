import "reflect-metadata";
import express from "express";
import { router } from "./routes";

import "./database";

// @types/express
const app = express();
const port = 3000;

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

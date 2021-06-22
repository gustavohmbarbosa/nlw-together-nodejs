import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

// controllers
const createUserController = new CreateUserController();

// routes
router.post("/users", createUserController.handle);

export { router };

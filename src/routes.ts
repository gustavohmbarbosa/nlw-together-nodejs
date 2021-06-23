import { Router } from "express";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { isAdmin } from "./middlewares/isAdmin";

const router = Router();

// controllers
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

// routes
router.post("/users", createUserController.handle);
router.post("/tags", isAdmin, createTagController.handle);

export { router };

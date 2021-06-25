import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { isAdmin } from "./middlewares/isAdmin";

const router = Router();

// controllers
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

// routes
router.post("/login", authenticateUserController.handle);
router.post("/users", createUserController.handle);
router.post("/tags", isAdmin, createTagController.handle);
router.post("/compliments", createComplimentController.handle);

export { router };

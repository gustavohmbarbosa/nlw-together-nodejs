import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";
import { ListComplimentsReceivedByUserController as ComplimentsReceivedByUser } from "./controllers/ListComplimentsReceivedByUserController";
import { ListComplimentsSentByUserController as ComplimentsSentByUser } from "./controllers/ListComplimentsSentByUserController";

const router = Router();

// controllers
const createUserController = new CreateUserController();
const listComplimentsReceivedByUserController = new ComplimentsReceivedByUser();
const listComplimentsSentByUserController = new ComplimentsSentByUser();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

// routes
router.post("/login", authenticateUserController.handle);

router.post("/users", createUserController.handle);
router.get(
  "/users/compliments/received",
  isAuthenticated,
  listComplimentsReceivedByUserController.handle
);
router.get(
  "/users/compliments/sent",
  isAuthenticated,
  listComplimentsSentByUserController.handle
);

router.post("/tags", isAuthenticated, isAdmin, createTagController.handle);
router.post("/compliments", isAuthenticated, createComplimentController.handle);

export { router };

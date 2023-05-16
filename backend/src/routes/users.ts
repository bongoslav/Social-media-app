import { Router } from "express";
import { getAllUsers, getUserByIdController } from "../controllers/users";
import { isAuthenticated } from "../middleware/authenticateMiddleware";

const usersRoutes = Router();

usersRoutes.get("/", isAuthenticated, getAllUsers);
usersRoutes.get("/:id", getUserByIdController);

export default usersRoutes
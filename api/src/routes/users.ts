import { Router } from "express";
import { getAllUsers, getUserByIdController } from "../controllers/users";
import { isAuthenticated, verifyJWT } from "../middleware/authenticateMiddleware";

const usersRoutes = Router();

usersRoutes.get("/", verifyJWT, getAllUsers);
usersRoutes.get("/:id", getUserByIdController);

export default usersRoutes
import { Router } from "express";
import { register, login, logout } from "../controllers/auth";
import { registerValidator } from "../validators/registerValidator";
import { loginValidator } from "../validators/loginValidator";
import { isAuthenticated } from "../middleware/authenticateMiddleware";

const mainRoutes = Router();

mainRoutes.post("/login", loginValidator, login);
mainRoutes.post("/logout", isAuthenticated, logout);
mainRoutes.post("/register", registerValidator, register);

export default mainRoutes;

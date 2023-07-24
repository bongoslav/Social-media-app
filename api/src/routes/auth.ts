import { Router } from "express";
import { register, login, logout, refresh } from "../controllers/auth";
import { registerValidator } from "../validators/registerValidator";
import { loginValidator } from "../validators/loginValidator";
import {
  isAuthenticated,
  verifyJWT,
} from "../middleware/authenticateMiddleware";

const mainRoutes = Router();

mainRoutes.post("/login", loginValidator, login);
mainRoutes.post("/logout", verifyJWT, logout);
mainRoutes.post("/register", registerValidator, register);
mainRoutes.get("/refresh", refresh);

export default mainRoutes;

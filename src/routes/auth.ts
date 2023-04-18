import { Router } from "express";
import {
  postRegister,
  postLogin,
  postLogout,
  getAllUsers,
} from "../controllers/auth";
import { registerValidator } from "../validators/registerValidator";
import { loginValidator } from "../validators/loginValidator";
import { isAuthenticated } from "../middleware/authenticateMiddleware";

const mainRoutes = Router();

mainRoutes.get("/users", isAuthenticated, getAllUsers);
mainRoutes.post("/login", loginValidator, postLogin);
mainRoutes.post("/logout", isAuthenticated, postLogout);
mainRoutes.post("/register", registerValidator, postRegister);

export default mainRoutes;

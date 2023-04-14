import { Router } from "express";
import {
  getLogin,
  postRegister,
  postLogin,
  postLogout,
} from "../controllers/auth";
import { registerValidator } from "../validators/registerValidator";
import { loginValidator } from "../validators/loginValidator";
import { isAuthenticated } from "../middleware/authenticateMiddleware";

const mainRoutes = Router();

mainRoutes.get("/login", getLogin);
mainRoutes.post("/login", loginValidator, postLogin);
mainRoutes.post("/logout", isAuthenticated, postLogout);
mainRoutes.post("/register", registerValidator, postRegister);

export default mainRoutes;

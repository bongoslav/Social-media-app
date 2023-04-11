import { Router } from "express";
import {
  getLogin,
  postRegister,
  postLogin,
  postLogout,
} from "../controllers/auth";
import registerValidator from "../validators/validateRegister";
import { isAuthenticated } from "../middleware/authenticateMiddleware";

const mainRoutes = Router();

mainRoutes.get("/login", getLogin);
mainRoutes.post("/login", postLogin);
mainRoutes.post("/logout", isAuthenticated, postLogout);
mainRoutes.post("/register", registerValidator, postRegister);

export default mainRoutes;

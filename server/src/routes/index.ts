import { Router } from "express";
import { getHome } from "../controllers/index";

const mainRoutes = Router();

mainRoutes.get("/", getHome);

export default mainRoutes;

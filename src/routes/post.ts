import { Router } from "express";
import { addPost, getPosts } from "../controllers/post";
import { isAuthenticated } from "../middleware/authenticateMiddleware";

const postRoutes: Router = Router();

postRoutes.get("/", getPosts);
postRoutes.post("/create", isAuthenticated, addPost);

export default postRoutes;

import { Router } from "express";
import { addComment, addPost, getPosts } from "../controllers/post";
import { isAuthenticated } from "../middleware/authenticateMiddleware";
import { paginateResults } from "../middleware/paginationMiddleware";
import Post from "../models/Post";

const postRoutes: Router = Router();

postRoutes.get("/", paginateResults(Post), getPosts);
postRoutes.post("/create", isAuthenticated, addPost);
postRoutes.post("/add-comment/:id", isAuthenticated, addComment);

export default postRoutes;

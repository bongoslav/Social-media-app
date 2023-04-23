import { Router } from "express";
import { addComment, addLike, addPost, getPosts } from "../controllers/post";
import { isAuthenticated } from "../middleware/authenticateMiddleware";
import { paginateResults } from "../middleware/paginationMiddleware";
import Post from "../models/Post";

const postRoutes: Router = Router();

postRoutes.get("/", paginateResults(Post), getPosts);
postRoutes.post("/create", isAuthenticated, addPost);
postRoutes.put("/add-comment/:id", isAuthenticated, addComment);
postRoutes.put("/:id/like", isAuthenticated, addLike);

export default postRoutes;

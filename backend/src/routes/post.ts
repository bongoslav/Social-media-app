import { Router } from "express";
import { addComment, addLike, addPost, deletePost, getPosts } from "../controllers/post";
import { isAuthenticated } from "../middleware/authenticateMiddleware";
import { paginateResults } from "../middleware/paginationMiddleware";
import Post from "../models/Post";

const postRoutes: Router = Router();

postRoutes.get("/", paginateResults(Post), getPosts);
postRoutes.post("/create", isAuthenticated, addPost);
postRoutes.post("/:id", isAuthenticated, deletePost);
postRoutes.post("/:id/add-comment", isAuthenticated, addComment);
postRoutes.put("/:id/like", isAuthenticated, addLike);

export default postRoutes;

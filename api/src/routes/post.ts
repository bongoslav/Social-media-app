import { Router } from "express";
import { addComment, addLike, addPost, checkIfLiked, deletePost, getPosts, removeLike } from "../controllers/post";
import { isAuthenticated } from "../middleware/authenticateMiddleware";
import { paginateResults } from "../middleware/paginationMiddleware";
import Post from "../models/Post";

const postRoutes: Router = Router();

postRoutes.get("/", paginateResults(Post), getPosts);
postRoutes.post("/create", isAuthenticated, addPost);
postRoutes.post("/:id", isAuthenticated, deletePost);
postRoutes.post("/:id/add-comment", isAuthenticated, addComment);
postRoutes.post("/:id/like", isAuthenticated, addLike);
postRoutes.post("/:id/unlike", isAuthenticated, removeLike);
postRoutes.post("/:id/check-if-liked", isAuthenticated, checkIfLiked);

export default postRoutes;

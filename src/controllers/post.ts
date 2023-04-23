import { Request, Response } from "express";
import Post from "../models/Post";
import { Comment } from "../models/Post";
import User from "../models/User";
import { get } from "lodash";

export const getPosts = async (req: Request, res: Response) => {
  res.status(200).json(res.locals.paginatedResult);
};

export const addPost = async (req: Request, res: Response) => {
  const content: string = req.body.content;
  let user: { _id: string }; // an object with the user's id
  user = get(req, "user._id");

  const post = new Post({
    author: user,
    content: content,
  });

  await User.findByIdAndUpdate(
    user,
    { $push: { posts: post._id } },
    { new: true }
  );

  await post.save();

  res.status(201).json(post);
};

export const addComment = async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  const userId: string = get(req, "user._id");

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const content: string = req.body.content;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const comment: Comment = {
      author: userId,
      content: content,
    };

    post.comments.push(comment);
    await post.save();

    return res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const addLike = async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  const userId: string = get(req, "user._id");

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.likes.push(userId);
    await post.save();

    return res.status(201).json({ message: "Like added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

import { Request, Response } from "express";
import Post from "../models/Post";
import { Comment } from "../models/Post";
import User, { IUser } from "../models/User";
import { get } from "lodash";
import mongoose from "mongoose";

export const getPosts = async (req: Request, res: Response) => {
  res.status(200).json(res.locals.paginatedResult);
};

export const addPost = async (req: Request, res: Response) => {
  const content: string = req.body.content;
  const userId = req.body.userId;

  const post = new Post({
    author: userId,
    content: content,
  });

  await User.findByIdAndUpdate(
    userId,
    { $push: { posts: post._id } },
    { new: true }
  );

  await post.save();

  res.status(201).json(post);
};

export const deletePost = async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  const user: string = req.body.user

  try {
    const post = await Post.findById(postId);
    const postAuthor = post.author;

    if (postAuthor.toString() !== user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.deleteOne({ _id: postId });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {}
};

export const addComment = async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  const userId: string = req.body.userId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const content: string = req.body.content;
    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const comment: Comment = {
      _id: new mongoose.Types.ObjectId().toString(),
      author: userId,
      content: content,
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json(comment);
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

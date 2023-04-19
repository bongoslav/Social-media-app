import { Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";
import { get } from "lodash";

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.find();
  res.status(200).json({ posts });
};

export const addPost = async (req: Request, res: Response) => {
  const content: string = req.body.content;
  let user: { _id: string };
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

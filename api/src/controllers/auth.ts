import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { IUser, UserModel } from "../models/User";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET: Secret = process.env.JWT_SECRET || "";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send(errors.array()[0]);
    }

    const user: IUser | null = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "No such user exists" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    // cookie
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {});

    return res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ id: user._id, email: user.email, username: user.username });
  } catch (err: any) {
    res.status(500).send("Server error");
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    return res
      .clearCookie("accessToken", {
        secure: false,
        sameSite: "none",
      })
      .status(200)
      .json("User logged out");
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array()[0]);
    }

    // Check if user already exists
    let user = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new UserModel({
      email,
      username,
      password: hashedPassword,
    });
    await user.save();

    return res.status(201).json(user);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

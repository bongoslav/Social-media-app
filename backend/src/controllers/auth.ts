import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User, { getUserByEmail } from "../models/User";
import jwt, { Secret } from "jsonwebtoken";
import { get } from "lodash";
import dotenv from "dotenv";
dotenv.config();

export const postLogin = async (req: Request, res: Response) => {
  const JWT_SECRET: Secret = process.env.JWT_SECRET || "";
  const { email, password } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send(errors.array());
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "No such user exists" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "4h",
    });

    user.tokens.push(token);
    await user.save();

    res.cookie("myApp_token", token, {
      domain: "localhost",
      maxAge: 4 * 60 * 60 * 1000,
      // commented out so that client side is able to access cookies
      // httpOnly: true, // to prevent client side JS from accessing the cookie
      secure: true, // to require HTTPS connection for cookie transmission
    });

    return res.status(200).json(user);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const postLogout = async (req: Request, res: Response) => {
  try {
    const currentUserId = get(req, "user._id");
    const currentUser = await User.findById(currentUserId);

    // remove the token from the user's tokens array
    // session === cookie[myApp_token]
    currentUser.tokens = currentUser.tokens.filter(
      (token: string) => token !== req.cookies["myApp_token"]
    );
    await currentUser.save();

    res.clearCookie("myApp_token");
    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const postRegister = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send(errors.array());
    }

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
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

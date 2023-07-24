import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { IUser, UserModel } from "../models/User";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET || "";
const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET || "";

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

    const accessToken = jwt.sign(
      {
        userId: user._id,
        // TODO: add the role to the token after it is added to the user model
      },
      accessTokenSecret,
      { expiresIn: "1m" }
    );

    const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, {
      expiresIn: "1d",
    });

    return res
      .cookie("jwt", refreshToken, {
        httpOnly: true, // accessible only by the web server
        secure: true, // https
        sameSite: "none", // cross-site cookie
        maxAge: 24 * 60 * 60 * 1000 * 7, // 7 days
      })
      .status(200)
      .json({
        id: user._id,
        email: user.email,
        username: user.username,
        accessToken: accessToken,
      });
  } catch (err: any) {
    res.status(500).send("Server error");
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    return res
      .clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ msg: "User logged out" });
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
      return res.status(400).json({ msg: "User already exists" });
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
    res.status(500).json({ msg: "Server error" });
  }
};

// issue a new access token when the refresh token is expired
export const refresh = (req: Request, res: Response) => {
  const cookie = req.cookies;

  if (!cookie?.jwt) return res.status(401).json({ msg: "Unauthorized, no cookie" });

  const refreshToken = cookie.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err: Error, decoded: JwtPayload) => {
      if (err) {
        return res.status(403).json({ msg: "Forbidden" });
      }

      const user: IUser | null = await UserModel.findOne({
        _id: decoded.userId,
      });
      if (!user) {
        return res.status(401).json({ msg: "Unauthorized" });
      }

      // creating a new access token
      const accessToken = jwt.sign(
        {
          userId: user._id,
          // TODO: add the role to the token after it is added to the user model
        },
        accessTokenSecret,
        { expiresIn: "1m" }
      );

      res.json({ accessToken });
    }
  );
};

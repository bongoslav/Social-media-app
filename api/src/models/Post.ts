import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface IPost extends Document {
  author: IUser["_id"];
  content: string;
  likes: string[];
  comments: Comment[];
  createdAt: Date;
}

export interface Comment {
  _id: string;
  author: IUser["_id"];
  content: string;
  createdAt: Date;
}

const PostSchema: Schema = new Schema<IPost>({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  likes: [String],
  comments: [
    {
      author: { type: String },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPost>("Post", PostSchema);

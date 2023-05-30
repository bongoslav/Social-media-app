import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface IPost extends Document {
  author: IUser["_id"];
  content: string;
  likes: string[];
  comments: Comment[];
}

export interface Comment {
  _id: string
  author: IUser["_id"];
  content: string;
}

const PostSchema: Schema = new Schema<IPost>({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  likes: [
    {
      author: { type: String },
    },
  ],
  comments: [
    {
      author: { type: String },
      content: { type: String, required: true },
    },
  ],
});

export default mongoose.model<IPost>("Post", PostSchema);

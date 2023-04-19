import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface IPost extends Document {
  author: IUser["_id"];
  content: string;
  likes: number;
  comments: string[];
}

const PostSchema: Schema = new Schema<IPost>({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [{ type: [String] }],
});

export default mongoose.model<IPost>("Post", PostSchema);

import mongoose, { Schema, Document } from "mongoose";
import { IPost } from "./Post";

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  posts: IPost["_id"][];
}

const UserSchema: Schema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUserById = (id: string) => UserModel.findById(id);
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);

export default mongoose.model<IUser>("User", UserSchema);

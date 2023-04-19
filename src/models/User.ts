import mongoose, { Schema, Document } from "mongoose";
import { IPost } from "./Post";

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  tokens: string[];
  posts: IPost["_id"][];
}

const UserSchema: Schema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  tokens: { type: [String], required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

export default mongoose.model<IUser>("User", UserSchema);

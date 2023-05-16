import IPost from "./Post";

export default interface IUser {
  email: string;
  password: string;
  username: string;
  tokens: string[];
  posts: IPost[];
}

import IComment from "./Comment";

export default interface IPost {
  _id: string;
  author: string;
  content: string;
  comments: IComment[];
  likes: { id: string }[];
}

import { useEffect, useState } from "react";
import IComment from "../../interfaces/Comment";
import IPost from "../../interfaces/Post";
import IUser from "../../interfaces/User";
import { fetchUser } from "../../services/userServices";
import Comment from "../Comment/Comment";

type PostProps = IPost;

function Post({ _id, author, content, comments, likes }: PostProps) {
  const [postAuthor, setPostAuthor] = useState<IUser | null>(null);

  useEffect(() => {
    fetchUser(author).then((user) => setPostAuthor(user));
  }, [author]);

  return (
    <div id={_id}>
      <h3>Post author (username): {postAuthor?.username}</h3>
      <h3>Post content: {content}</h3>
      <h3>Comments:</h3>
      {comments.map((comment: IComment) => (
        <Comment {...comment} key={comment._id} />
      ))}
      <h3>Likes: {likes.length}</h3>
    </div>
  );
}

export default Post;

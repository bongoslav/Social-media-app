import { useEffect, useState } from "react";
import IComment from "../../interfaces/Comment";
import IUser from "../../interfaces/User";
import { fetchUser } from "../../services/userServices";

export default function Comment({ _id, author, content }: IComment) {
  const [commentAuthor, setCommentAuthor] = useState<IUser | null>(null);

  useEffect(() => {
    fetchUser(author).then((user) => setCommentAuthor(user));
  }, [author]);

  return (
    <div key={_id}>
      <strong>Author:</strong> {commentAuthor?.username} <br />
      <strong>Content:</strong> {content}
    </div>
  );
}

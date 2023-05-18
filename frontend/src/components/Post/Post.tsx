import { useEffect, useState } from "react";
import IComment from "../../interfaces/Comment";
import IPost from "../../interfaces/Post";
import IUser from "../../interfaces/User";
import { fetchUser } from "../../services/userServices";
import Comment from "../Comment/Comment";
import { Alert, Button } from "@mui/material";
import { addComment } from "../../services/postServices";

type PostProps = IPost;

function Post({ _id, author, content, comments, likes }: PostProps) {
  const [postAuthor, setPostAuthor] = useState<IUser | null>(null);
  const [newComment, setNewComment] = useState("");
  const [existingComments, setExistingComments] =
    useState<IComment[]>(comments);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchUser(author).then((user) => setPostAuthor(user));
  }, [author]);

  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  const handleAddComment = async () => {
    try {
      const response = await addComment(_id, newComment);

      setNewComment("");
      setExistingComments((prevComments) => [...prevComments, response]);
    } catch (error: any) {
      const message = error.message || "Failed to add comment";
      setErrorMessage(message);
    }
  };

  return (
    <div style={{ border: "1px solid black", padding: "1rem" }} key={_id}>
      <h3>Post author (username): {postAuthor?.username}</h3>
      <h3>Post content: {content}</h3>
      <Button onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </Button>
      {showComments && (
        <>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={handleAddComment}>Add Comment</button>
          <div>
            {existingComments.map((comment: IComment) => (
              <Comment {...comment} key={comment._id} />
            ))}
          </div>
        </>
      )}
      <h3>Likes: {likes.length}</h3>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </div>
  );
}

export default Post;

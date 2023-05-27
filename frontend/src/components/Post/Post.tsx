import { useEffect, useState } from "react";
import IComment from "../../interfaces/Comment";
import IPost from "../../interfaces/Post";
import IUser from "../../interfaces/User";
import { fetchUser } from "../../services/userServices";
import Comment from "../Comment/Comment";
import { addComment, deletePost } from "../../services/postServices";

type PostProps = IPost;

function Post({ _id, author, content, comments, likes }: PostProps) {
  const [postAuthor, setPostAuthor] = useState<IUser | null>(null);
  const [newComment, setNewComment] = useState("");
  const [existingComments, setExistingComments] =
    useState<IComment[]>(comments);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleted, setDeleted] = useState(false);
  // only in Post component for now
  const currentUser = localStorage.getItem("user");

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

  const handleDeletePost = async () => {
    try {
      await deletePost(_id);
      setDeleted(true);
    } catch (error: any) {
      const message = error.message || "Failed to delete post";
      setErrorMessage(message);
    }
  };

  if (deleted) {
    return null; // Return null to remove the component from the DOM
  }

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "1rem",
      }}
      key={_id}
    >
      <h3>Post author (username): {postAuthor?.username}</h3>
      <h3>Post content: {content}</h3>
      <button onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
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

      {currentUser === `"${author}"` && (
        <button onClick={handleDeletePost}>Delete post</button>
      )}
      {errorMessage && <div className="alert error">{errorMessage}</div>}
    </div>
  );
}

export default Post;

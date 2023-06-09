import { useEffect, useState } from "react";
import IComment from "../../interfaces/Comment";
import IPost from "../../interfaces/Post";
import IUser from "../../interfaces/User";
import { fetchUser } from "../../services/userServices";
import Comment from "../Comment/Comment";
import {
  addComment,
  checkIfLiked,
  deletePost,
  likePost,
  unlikePost,
} from "../../services/postServices";

import "./Post.css";

type PostProps = IPost;

function Post({ _id, author, content, comments, likes, createdAt }: PostProps) {
  const [postAuthor, setPostAuthor] = useState<IUser | null>(null);
  const [newComment, setNewComment] = useState("");
  const [existingComments, setExistingComments] =
    useState<IComment[]>(comments);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [liked, setLiked] = useState<boolean>(false);
  const currentUser = sessionStorage.getItem("user");

  const formatDate = (date: Date) => {
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const monthIndex = date.getUTCMonth();
    // const year = String(date.getUTCFullYear()).slice(-2);

    const monthAbbreviations = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthAbbreviation = monthAbbreviations[monthIndex];

    return `${hours}:${minutes} · ${monthAbbreviation} ${day}`;
  };

  useEffect(() => {
    fetchUser(author).then((user) => setPostAuthor(user));
  }, [author]);

  // check if already liked on start
  useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        const isLiked = await checkIfLiked(_id);

        setLiked(isLiked);
      } catch (error) {
        console.error("Error checking if liked:", error);
      }
    };
    fetchLikedStatus();
  }, []);

  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  const handleAddComment = async () => {
    try {
      const response: IComment = await addComment(_id, newComment);

      setExistingComments((prevComments) => [...prevComments, response]);
      setNewComment("");
    } catch (error: any) {
      const message = "Failed to add comment";
      setErrorMessage(error.response.data.message || message);
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(_id);
      setDeleted(true);
    } catch (error: any) {
      const message = "Failed to delete post";
      setErrorMessage(message);
    }
  };

  if (deleted) {
    return null; // Return null to remove the component from the DOM
  }

  const handleLikePost = async () => {
    try {
      if (liked) {
        await unlikePost(_id);
        setLikesCount((prevLikes) => prevLikes - 1);
      } else {
        await likePost(_id);
        setLikesCount((prevLikes) => prevLikes + 1);
      }
      setLiked(!liked);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="post-wrapper" key={_id}>
      <div className="post-header">
        <div className="username-date-container">
          <h2 className="post-author">{postAuthor?.username}</h2>
          <p className="post-date">{formatDate(new Date(createdAt))}</p>
        </div>
        {currentUser === `"${author}"` && (
          <button className="btn-delete-post" onClick={handleDeletePost}>
            Delete post
          </button>
        )}
      </div>

      <p className="post-content">{content}</p>

      <div className="post-actions">
        <p className="post-likes">
          {likesCount} {currentUser ? "" : "❤️"}
        </p>
        {currentUser && (
          <button
            className={`btn-like ${liked ? "liked" : ""}`}
            onClick={handleLikePost}
          >
            {liked ? "💔" : "❤️"}
          </button>
        )}

        <button className="btn-toggle-comments" onClick={toggleComments}>
          💬
        </button>
      </div>

      {showComments && (
        <>
          <div>
            {existingComments.length === 0 ? (
              <p id="no-comments">Wow such empty...</p>
            ) : (
              existingComments.map((comment: IComment) => (
                <Comment {...comment} key={comment._id} />
              ))
            )}
          </div>
          {currentUser && (
            <div className="add-comment-wrapper">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className="btn-add-comment" onClick={handleAddComment}>
                Add Comment
              </button>
            </div>
          )}
          {errorMessage && <div className="err-msg">{errorMessage}</div>}
        </>
      )}
    </div>
  );
}

export default Post;

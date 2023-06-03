import { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import IPost from "../../interfaces/Post";
import { createPost, fetchPosts } from "../../services/postServices";
import React from "react";
import { Await } from "react-router-dom";
import { AxiosError } from "axios";
import "./Home.css";

export function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isLoggedIn = sessionStorage.getItem("user");

  useEffect(() => {
    async function fetchData() {
      try {
        const posts = await fetchPosts();
        setPosts(posts);
      } catch (error) {
        // properly handle axios typescript errors
        let message = "Something went wrong";
        if (error instanceof AxiosError) message = error.message;
        console.error("Failed to fetch posts: ", message);
      }
    }

    fetchData();
  }, []);

  const handlePostSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await createPost(newPostContent);
      // Clear the input field after successful post creation
      setNewPostContent("");
      // Fetch the updated list of posts
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    } catch (error: any) {
      // not so properly handled axios typescript error
      const message = "Failed to add comment";
      setErrorMessage(error.response.data.message || message);
    }
  };

  return (
    <div className="feed-container">
      {isLoggedIn && (
        <div className="new-post-container">
          <textarea
            className="post-textarea"
            value={newPostContent}
            onChange={(event) => setNewPostContent(event.target.value)}
            maxLength={280}
            rows={5}
            placeholder="What's on your mind?"
          />
          <div className="post-actions">
            <button
              type="submit"
              className="btn-add-post"
              onClick={handlePostSubmit}
            >
              Post
            </button>
          </div>
          {errorMessage && <div className="err-msg-post">{errorMessage}</div>}
        </div>
      )}

      <React.Suspense fallback={<p>Loading...</p>}>
        <Await resolve={posts} errorElement={<p>Error loading posts</p>}>
          {posts.map((post) => (
            <Post key={post._id} {...post} />
          ))}
        </Await>
      </React.Suspense>
    </div>
  );
}

export default Home;

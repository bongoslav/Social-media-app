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
  const isLoggedIn = sessionStorage.getItem("user");

  useEffect(() => {
    async function fetchData() {
      try {
        const posts = await fetchPosts();
        setPosts(posts);
      } catch (error) {
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
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="wrapper">
      {isLoggedIn && (
        // don't crash the app when validation fails. use same as comment validation
        <div>
          <form onSubmit={handlePostSubmit}>
            <input
              type="text"
              value={newPostContent}
              onChange={(event) => setNewPostContent(event.target.value)}
              placeholder="New Post"
            />
            <button type="submit">Post</button>
          </form>
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

import { useEffect, useState } from "react";
import Post from "../Post/Post";
import IPost from "../../interfaces/Post";
import { createPost, fetchPosts } from "../../services/postServices";
import { Button, TextField } from "@mui/material";
import { isLoggedIn } from "../../services/authServices";
import React from "react";
import { Await } from "react-router-dom";

export function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const isAuthenticated = isLoggedIn();

  useEffect(() => {
    async function fetchData() {
      try {
        const posts = await fetchPosts();
        setPosts(posts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    }

    fetchData();
  }, []);

  const handlePostSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Call your API endpoint to create a new post
      // Pass the new post content from the state or form input value
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

  // TODO:
  // add like
  // delete a post button if i am the author

  return (
    <div>
      {isAuthenticated && (
        // don't crash the app when validation fails. use same as comment validation
        <form onSubmit={handlePostSubmit}>
          <TextField
            label="New Post"
            value={newPostContent}
            onChange={(event) => setNewPostContent(event.target.value)}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Post
          </Button>
        </form>
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

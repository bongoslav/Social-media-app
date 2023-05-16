import { useEffect, useState } from "react";
import Post from "../Post/Post";
import IPost from "../../interfaces/Post";
import { fetchPosts } from "../../services/postServices";

export function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);

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


  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </div>
  );
}

export default Home;

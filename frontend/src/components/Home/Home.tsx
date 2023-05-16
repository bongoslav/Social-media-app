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

  // in order to display the current user's info
  // i need to create an endpoint in the backend
  // see here https://github.com/KartikSingh023/Sociopedia/blob/main/client/src/scenes/widgets/UserWidget.jsx
  // `getUser`
  // (getUser controller with a route) and
  // const user = await User.findById(id);
  // res.status(200).json(user);))
  // however password?

  return (
    // TODO:
    // display # of likes and comments
    // add like/comments
    // improve UI
    <div>
      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </div>
  );
}

export default Home;

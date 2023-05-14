import { useLoaderData } from "react-router-dom";

interface Post {
  id: string;
  author: string;
  content: string;
  comments: object[];
  likes: { id: string }[];
}

export function HomePage() {
  const posts = useLoaderData() as Post[];

  return (
    // TODO:
    // render a Post component instead of plain html here
    // associate an Author ID with First/Last names
    // ^ mby need a change in the backend logic
    // display # of likes and comments
    // improve UI
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          Author: {post.author} Content: {post.content}
        </li>
      ))}
    </ul>
  );
}

export default HomePage;

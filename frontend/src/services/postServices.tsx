import axios from "axios";

export async function fetchPosts() {
  const response = await axios.get("http://localhost:3000/posts", {
    withCredentials: true,
  });
  return response.data.results;
}

export async function createPost(newPostContent: string) {
  const response = await axios.post(
    "http://localhost:3000/posts/create",
    {
      content: newPostContent,
      userId: localStorage.getItem("user")?.replace(/"/g, ""),
    },
    {
      withCredentials: true, // include the cookie
    }
  );

  return response.data;
}

export async function addComment(postId: string, content: string) {
  const response = await axios.post(
    `http://localhost:3000/posts/${postId}/add-comment`,
    {
      content:content,
      userId: localStorage.getItem("user")?.replace(/"/g, ""),
    },
    {
      withCredentials: true,
    }
  );

  if (response.status !== 201) {
    throw new Error(response.data || "Failed to add comment");
  }


  return response.data;
}

export async function deletePost(postId: string) {
  const response = await fetch(`http://localhost:3000/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies in the request
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete post");
  }

  return data;
}

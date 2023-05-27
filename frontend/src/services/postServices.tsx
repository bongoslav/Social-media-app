import axios from "axios";

export async function fetchPosts() {
  const response = await axios.get("http://localhost:3000/posts", {
    withCredentials: true
  });
  return response.data.results;
}

export async function createPost(newPostContent: string) {
  const response = await axios.post("http://localhost:3000/posts/create", {
    content: newPostContent,
    headers: {
      authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  console.log(response);

  return response.data;
}

export async function addComment(postId: string, content: string) {
  const response = await fetch(
    `http://localhost:3000/posts/${postId}/add-comment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: content }),
      credentials: "include", // Include cookies in the request
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add comment");
  }

  return data;
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

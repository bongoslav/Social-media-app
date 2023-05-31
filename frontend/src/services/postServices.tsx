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
      userId: sessionStorage.getItem("user")?.replace(/"/g, ""),
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
      content: content,
      userId: sessionStorage.getItem("user")?.replace(/"/g, ""),
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
  const response = await axios.post(
    `http://localhost:3000/posts/${postId}`,
    {
      user: sessionStorage.getItem("user")?.replace(/"/g, ""),
    },
    {
      withCredentials: true,
    }
  );

  if (response.status !== 200) {
    throw new Error(response.data || "Failed to delete post");
  }

  return response.data;
}

export async function likePost(postId: string) {
  const response = await axios.post(
    `http://localhost:3000/posts/${postId}/like`,
    {
      userId: sessionStorage.getItem("user")?.replace(/"/g, ""),
    },
    {
      withCredentials: true,
    }
  );

  if (response.status !== 201) {
    throw new Error(response.data || "Failed to like post");
  }

  return response.data;
}

export async function unlikePost(postId: string) {
  const response = await axios.post(
    `http://localhost:3000/posts/${postId}/unlike`,
    {
      userId: sessionStorage.getItem("user")?.replace(/"/g, ""),
    },
    { withCredentials: true }
  );

  return response.data
}

export async function checkIfLiked(postId: string): Promise<boolean> {
  const response = await axios.post(
    `http://localhost:3000/posts/${postId}/check-if-liked`,
    {
      userId: sessionStorage.getItem("user")?.replace(/"/g, ""),
    },
    { withCredentials: true }
  );

  return response.data.liked
}
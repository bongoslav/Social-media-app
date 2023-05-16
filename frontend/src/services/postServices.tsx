export async function fetchPosts() {
  const response = await fetch("http://localhost:3000/posts");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch posts");
  }

  return data.results;
}
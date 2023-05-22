export async function logoutUser() {
  try {
    const response = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    localStorage.clear()

    if (!response.ok) {
      throw new Error(data.message || "Failed to logout");
    }
    window.location.reload();
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}

export function isLoggedIn() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("myApp_token="))
    ?.split("=")[1];

  // Return true if the authentication token is present, otherwise return false
  return !!token;
}

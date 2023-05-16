export async function logoutUser() {
  try {
    const response = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to logout");
    }
    window.location.reload();
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}

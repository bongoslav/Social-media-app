import axios from "axios";

export async function logoutUser() {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/logout",
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.status !== 200) {
      throw new Error(response.data.message || "Failed to logout");
    }

    sessionStorage.removeItem("user");
    window.location.reload();
  } catch (error) {
    throw new Error("Error logging out");
  }
}

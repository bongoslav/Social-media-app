import IUser from "../interfaces/User";

export async function fetchUser(userId: string): Promise<IUser> {
  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch user");
    }

    return data as IUser;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

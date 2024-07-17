import baseURL from "./config";

export const fetchUserData = async () => {
  try {
    const response = await fetch(`${baseURL}/api/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};


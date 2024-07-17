// utils/fetchData.js
export const fetchUserData = async () => {
  const response = await fetch("/data/users.json");
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return await response.json();
};

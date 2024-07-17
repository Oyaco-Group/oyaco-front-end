// src/utils/dataTest.jsx
import axios from "axios";

export const fetchUserData = async () => {
  try {
    const response = await axios.get("/data/users.json");
    return response.data; // Assumption: users is an array in users.json
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    // Here you should implement the logic to update user in users.json
    // Example logic to find and update user by id
    const users = await fetchUserData();
    const updatedUsers = users.map((user) =>
      user.id === userData.id ? { ...user, ...userData } : user,
    );
    // Save updatedUsers back to users.json (this part depends on your backend setup)
    // For simplicity, we throw an error as this logic is not implemented
    throw new Error("updateUser function is not implemented for JSON file");
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    // Here you should implement the logic to delete user in users.json
    // Example logic to filter out user by id
    const users = await fetchUserData();
    const filteredUsers = users.filter((user) => user.id !== userId);
    // Save filteredUsers back to users.json (this part depends on your backend setup)
    // For simplicity, we throw an error as this logic is not implemented
    throw new Error("deleteUser function is not implemented for JSON file");
  } catch (error) {
    throw error;
  }
};

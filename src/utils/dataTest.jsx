import axios from "axios";

export const fetchUserData = async () => {
  try {
    const response = await axios.get("/data/users.json");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    console.log("Data to be sent:", userData); // Console log data sebelum pengiriman
    const users = await fetchUserData();
    const updatedUsers = users.map((user) =>
      user.id === userData.id ? { ...user, ...userData } : user,
    );
    await axios.put("/data/users.json", { users: updatedUsers });
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const users = await fetchUserData();
    const filteredUsers = users.filter((user) => user.id !== userId);
    console.log("Filtered Users:", filteredUsers); // Log filtered users before deletion
    await axios.put("/data/users.json", { users: filteredUsers });
  } catch (error) {
    throw error;
  }
};

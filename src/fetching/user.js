import instance from "@/lib/axios";

export const fetchUsers = async (page = 1, limit = 5) => {
  try {
    const response = await instance.get(`/user`, {
      params: {
        page: page,
        limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user data:",
      error.response || error.message || error
    );
    throw error;
  }
};

export const fetchUpdateUser = async ({
  userId,
  name,
  email,
  password,
  address,
}) => {
  try {
    const response = await instance.put(`/user/edit/${userId}`, {
      name,
      email,
      password,
      address,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error edit user:", error);
    throw error;
  }
};

export const fetchDeleteUser = async (userId) => {
  try {
    const response = await instance.delete(`/user/delete/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

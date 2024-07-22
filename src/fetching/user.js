import instance from "@/lib/axios";

export const fetchUsers = async (page, limit) => {
  try {
    const response = await instance.get(`/user`, {
      params: {
        page: page,
        limit: limit,
      },
    });
    return {
      data: response.data.data.users,
      totalUsers: response.data.data.total_user,
      totalPages: response.data.data.total_page,
    };
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
  // console.log("Updating user with ID:", userId);

  if (!userId || isNaN(parseInt(userId, 10))) {
    throw new Error("Invalid User ID");
  }

  try {
    const response = await instance.put(`/user/edit/${userId}`, {
      name,
      email,
      password,
      address,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error editing user:", error);
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

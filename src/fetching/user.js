import instance from "@/lib/axios";

export const fetchProfileUser = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await instance.get("/user/detail/profile", {
      headers: {
        Authorization: token,
      },
    });
    if (response.data.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch user profile");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching user profile");
  }
};

export const fetchUsers = async (page, limit) => {
  try {
    const response = await instance.get(`/user`, {
      params: { page, limit },
      headers: {
        Authorization: localStorage.getItem("access_token"),
      },
    });
    return {
      data: response.data.data.users,
      totalUsers: response.data.data.total_user,
      totalPages: response.data.data.total_page,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const fetchUpdateUser = async (userData) => {
  const { userId, name, email, password, address } = userData;
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

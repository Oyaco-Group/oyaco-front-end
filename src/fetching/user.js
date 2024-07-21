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

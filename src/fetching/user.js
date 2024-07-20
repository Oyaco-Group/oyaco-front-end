import instance from "@/lib/axios";

export const fetchUsers = async () => {
  try {
    const response = await instance.get("/categories");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching category data:", error);
    throw error;
  }
};

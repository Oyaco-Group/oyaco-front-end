import instance from "@/lib/axios";

export const fetchMaster = async (page = 1, limit = 10) => {
  try {
    const response = await instance.get("/masterProduct", {
      params: { page, limit },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching master products data:", error);
    throw error;
  }
};

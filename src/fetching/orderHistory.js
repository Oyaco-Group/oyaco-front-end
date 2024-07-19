import instance from "@/lib/axios";

export const fetchOrderHistoryById = async (params) => {
  try {
    const id = params;
    const response = await instance.get(`/order/getoneorderuser/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching order history data:", error);
    throw error;
  }
};

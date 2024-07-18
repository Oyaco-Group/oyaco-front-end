import instance from "@/lib/axios";

export const fetchOrderData = async ({ params }) => {
  const { id } = params;

  try {
    const response = await instance.get(`/order/getoneorder/${id}`);
    const data = response.data;

    return data
  } catch (error) {
    console.error("Error fetching order:", error);
    return null
  }
};

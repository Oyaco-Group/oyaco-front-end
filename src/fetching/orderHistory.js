import instance from "@/lib/axios";

export const fetchOrderHistoryById = async (params) => {
  try {
    const id = params;
    const response = await instance.get(`/order/getoneorderuser/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error getting order history data:", error);
    throw error;
  }
};

export const fetchOrderHistoryDetailById = async (params) => {
  try {
    const order_id = params;
    const response = await instance.get(
      `/orderitem/getoneorderitem/${order_id}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error getting order item data:", error);
    throw error;
  }
};

export const fetchOrderComplaint = async (order_id) => {
  try {
    const response = await instance.get(`/complaint/${order_id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error getting complaint data:", error);
    throw error;
  }
};

export const fetchUpdateOrderComplaint = async (order_id, text) => {
  try {
    const response = await instance.patch(`/complaint/edit/${order_id}`, {
      text,
      iscomplaint: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating complaint:", error);
    throw error;
  }
};

export const fetchOrderHistoryByOrderId = async (params) => {
  try {
    const id = params;
    const response = await instance.get(`/order/getoneorder/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error getting order history data:", error);
    throw error;
  }
};

export const fetchUpdateOrderStatus = async (id, order_status) => {
  try {
    const response = await instance.patch(`/order/updateorderstatus/${id}`, {
      order_status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

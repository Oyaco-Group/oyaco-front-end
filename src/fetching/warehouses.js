import instance from "@/lib/axios";

export const fetchWarehouse = async () => {
  try {
    const response = await instance.get("/warehouses");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching warehouse data:", error);
    throw error;
  }
};

export const createWarehouse = async ({ name, location }) => {
  try {
    const response = await instance.post("/warehouses/add", { name, location });
    return response.data.data;
  } catch (error) {
    console.error("Error creating warehouse:", error);
    throw error;
  }
};

export const editWarehouse = async ({ id, name, location }) => {
  try {
    const response = await instance.put(`/warehouses/edit/${id}`, {
      name,
      location,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error editing warehouse:", error);
    throw error;
  }
};

export const deleteWarehouse = async (id) => {
  try {
    const response = await instance.delete(`/warehouses/delete/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting warehouses:", error);
    throw error;
  }
};

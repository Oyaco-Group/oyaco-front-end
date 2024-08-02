import instance from "@/lib/axios";

export const fetchMasterProduct = async (page, limit) => {
  try {
    const response = await instance.get("/masterProduct", {
      params: { page, limit },
    });
    return response?.data
  } catch (error) {
     console.error("Error fetching master products data:", error);
     throw error;
  }
};

export const fetchMaster = async (page = 1, limit = 10) => {
  try {
    const response = await instance.get("/masterProduct", {
      params: { page, limit },
    });
    console.log(response, "<<<<<<<<<<<<<");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching master products data:", error);
    throw error;
  }
};

export const createProducts = async (productData) => {
  try {
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    const response = await instance.post("/masterProduct/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const editProducts = async (id, productData) => {
  try {
    const formData = new FormData();
    for (const key in productData) {
      if (productData[key] !== null && productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    }
    const response = await instance.put(`/masterProduct/edit/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error editing product:", error);
    throw error;
  }
};

export const deleteProducts = async (id) => {
  try {
    const response = await instance.delete(`/masterProduct/delete/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

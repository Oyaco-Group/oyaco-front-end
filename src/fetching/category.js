import instance from "@/lib/axios";

export const fetchCategory = async () => {
  try {
    const response = await instance.get("/categories");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching category data:", error);
    throw error;
  }
};

export const createCategory = async (name) => {
  try {
    const response = await instance.post("/categories/add", { name });
    return response.data.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const editCategory = async (id, name) => {
  try {
    const response = await instance.put(`/categories/edit/${id}`, { name });
    return response.data.data;
  } catch (error) {
    console.error("Error editing category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await instance.delete(`/categories/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

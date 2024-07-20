import instance from "@/lib/axios";

const register = async (userData) => {
  try {
    console.log("Payload:", userData);
    const response = await instance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

const login = async (userData) => {
  try {
    const response = await instance.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export { register, login };

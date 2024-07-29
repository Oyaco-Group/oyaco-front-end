import instance from "@/lib/axios";

export const fetchDashboard = async () => {
  try {
    const response = await instance.get("/dashboard");
    console.log(response);
    if (response.status !== 200) {
      throw new Error("Failed to fetch dashboard data");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error in fetchDashboard:", error);
    throw error;
  }
};

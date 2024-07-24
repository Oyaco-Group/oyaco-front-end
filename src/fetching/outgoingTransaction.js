import instance from "@/lib/axios";


const getAllTransactions = async (warehouse, page) => {
  const response = await instance({
    method: "GET",
    url: `/transactions/outgoing/${warehouse}?page=${page}`,
  });
  return response.data;
};


export { getAllTransactions };

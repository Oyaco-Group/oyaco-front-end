import instance from "@/lib/axios";

const getAllTransactions = async () => {
  const response = await instance({
    method: "GET",
    url: "/transactions",
  });
  return response.data;
};

const getOutgoingTransactionsById = async () => {};

export { getAllTransactions, getOutgoingTransactionsById };

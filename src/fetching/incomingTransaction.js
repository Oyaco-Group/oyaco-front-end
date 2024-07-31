import instance from "@/lib/axios";

const getAllIncomingTransactions = async (warehouse, page) => {
  const response = await instance({
    method: "GET",
    url: `/transactions/incoming/${warehouse}?page=${page}`,
  });
  return response.data;
};

const getAllIncoming = async (page) => {
  const response = await instance({
    method: "GET",
    url: `/transactions/incomingTransactions?page=${page}`,
  });
  return response.data;
};

const getWarehouses = async () => {
  const response = await instance({
    method: "GET",
    url: `/warehouses`,
  });
  return response.data.data;
};

const createTransaction = async (transactionData) => {
  const response = await instance({
    method: "POST",
    url: `/transactions`,
    data: transactionData,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data.data;
};

const updateAndCheck = async () => {
  const response = await instance({
    method: "PUT",
    url: `/transactions/expStatus`,
  });
  return response.data;
};


// const getUser = async (page, limit) => {
//   const response = await instance({
//     method: "GET",
//     url: `/user?page=${page}&limit=${limit}`,
//   });
//   return response.data.data;
// };

export { getAllIncomingTransactions, getWarehouses, createTransaction, getAllIncoming, updateAndCheck };

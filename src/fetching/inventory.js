import instance from "@/lib/axios";

const getAllStock = async (page) => {
  const response = await instance({
    method: "GET",
    url: `/inventory/stock?page=${page}`,
  });
  return response.data.data;
};

const getStockByWarehouse = async (warehouse_id, page) => {
  const response = await instance({
    method: "GET",
    url: `/inventory/warestock/${warehouse_id}?page=${page}`,
  });
  return response.data.data;
};

const getWarehouses = async () => {
  const response = await instance({
    method: "GET",
    url: `/warehouses`,
  });
  return response.data.data;
};

export { getAllStock, getStockByWarehouse, getWarehouses };

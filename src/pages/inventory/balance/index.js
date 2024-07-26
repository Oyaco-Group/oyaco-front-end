import { useState, useEffect } from "react";
import Table from "@/components/style-components/table";
import Dropdown from "@/components/style-components/dropdown";
import SpinnerLoad from "@/components/style-components/loading-indicator/spinner-load";
import SearchBar from "@/components/style-components/navbar/searchbar";
import Button from "@/components/style-components/button";
import { getWarehouses, getStockByWarehouse } from "@/fetching/inventory";

const InventoryBalancePage = () => {
  const columns = [
    { field: "no", label: "No" },
    { field: "master_product_id", label: "Product ID" },
    { field: "master_product_name", label: "Product Name" },
    { field: "master_product_price", label: "Product Price" },
    { field: "warehouse_id", label: "Warehouse" },
    { field: "quantity", label: "Quantity" },
  ];

  const [inventory, setInventory] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchWarehouses = async () => {
    setLoading(true);
    try {
      const data = await getWarehouses();
      const formattedWarehouses = data.map((warehouse) => ({
        id: warehouse.id,
        label: warehouse.name,
      }));
      setWarehouses(formattedWarehouses);
      if (formattedWarehouses.length > 0) {
        setSelectedWarehouse(formattedWarehouses[0]);
      } else {
        setError("No warehouses available");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load warehouses");
    } finally {
      setLoading(false);
    }
  };

  const fetchInventory = async (warehouseId, page) => {
    setLoading(true);
    try {
      const data = await getStockByWarehouse(warehouseId, page);
      const formattedData = data.map((item, index) => ({
        ...item,
        master_product_name: item.master_product.name,
        master_product_price: item.master_product.price,
      }));
      setInventory(formattedData);
    } catch (err) {
      console.error(err);
      setError("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const sortInventory = () => {
    const sortedInventory = [...inventory].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.quantity - b.quantity;
      } else {
        return b.quantity - a.quantity;
      }
    });
    setInventory(sortedInventory);
  };
  
  useEffect(() => {
    fetchWarehouses();
  }, []);

  useEffect(() => {
    if (selectedWarehouse) {
      fetchInventory(selectedWarehouse.id, page);
    }
  }, [selectedWarehouse, page]);

  useEffect(() => {
    sortInventory();
  }, [sortOrder, inventory]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="mt-14 rounded-lg p-4 dark:border-gray-700">
        <h1 className="mt-4 mb-6 text-2xl text-gray-800">Inventory Balance</h1>

        <div className="relative overflow-x-auto">
          <div className="flex flex-wrap items-center justify-between space-y-4 bg-white py-4 md:flex-row md:space-y-0 dark:bg-gray-900">
            <div className="flex items-center gap-4">
              <p>Select warehouse: </p>
              <Dropdown
                options={warehouses}
                onSelect={(option) => setSelectedWarehouse(option)}
                defaultValue={selectedWarehouse}
              />
            </div>
            <div className="flex items-center gap-4">
              <SearchBar className="w-50" />
              <Button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")} className="text-sm py-1 px-2 w-60">
                Sorted by {sortOrder === "asc" ? "Lowest" : "Highest"} Quantity 
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {loading ? (
              <SpinnerLoad />
            ) : error ? (
              <p>{error}</p>
            ) : (
              <Table columns={columns} data={inventory} />
            )}
          </div>
          <div className="flex justify-between mt-4">
            <Button onClick={handlePreviousPage} disabled={page === 1} className="w-32">
              Previous
            </Button>
            <span>Page {page}</span>
            <Button onClick={handleNextPage} className="w-32">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryBalancePage;

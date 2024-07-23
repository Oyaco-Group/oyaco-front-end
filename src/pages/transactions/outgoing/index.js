import TableTransaction from "@/components/style-components/tableTransaction";
import { useState, useEffect } from "react";
import Dropdown from "@/components/style-components/dropdown";
import SpinnerLoad from "@/components/style-components/loading-indicator/spinner-load";
import SearchBar from "@/components/style-components/navbar/searchbar";
import Button from "@/components/style-components/button";
import { getAllTransactions } from "@/fetching/outgoingTransaction";

const TransactionOutgoingPage = () => {
  const columns = [
    { field: "user_id", label: "Admin ID" },
    { field: "master_product_id", label: "Product ID" },
    { field: "inventory_id", label: "Inventory ID" },
    { field: "origin", label: "Warehouse" },
    { field: "destination", label: "Delivered to" },
    { field: "quantity", label: "Quantity" },
    { field: "arrival_date", label: "Date" },
    { field: "expiration_date", label: "Expiration Date" },
    { field: "expiration_status", label: "Expiration Status" },
    { field: "action", label: "Action" },
  ];

  const [transaction, setTransaction] = useState([]);
  const [page, setPage] = useState(1);
  const [warehouse, setWarehouse] = useState(1);

  const fetchOutgoingTransaction = async (warehouse, page) => {
    try {
      const data = await getAllTransactions(warehouse, page);
      setTransaction(data.data);
      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOutgoingTransaction(warehouse, page);
  }, [warehouse, page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  

  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="mt-14 rounded-lg p-4 dark:border-gray-700">

          <h1 className="mt-4 mb-6 text-2xl text-gray-800">Outgoing Transaction</h1>

          <div className="relative overflow-x-auto">
            <div className="flex flex-wrap items-center justify-between space-y-4 bg-white py-4 md:flex-row md:space-y-0 dark:bg-gray-900">
              <div className="flex items-center gap-4">
                <p>Select warehouse: </p>
                <Dropdown />
                <Dropdown />
              </div>
              <div>
                <SearchBar className="w-72" />
              </div>
              <div>
                <Button>Create Transaction</Button>
              </div>
            </div>
            <div className="flex items-center justify-center"></div>
            <TableTransaction columns={columns} data={transaction} />
            <div className="flex justify-between mt-4">
              <Button onClick={handlePreviousPage} disabled={page === 1}>Previous</Button>
              <span>Page {page}</span>
              <Button onClick={handleNextPage}>Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionOutgoingPage;

import Table from "@/components/style-components/table";
import { useState, useEffect } from "react";
import Dropdown from "@/components/style-components/dropdown";
import SpinnerLoad from "@/components/style-components/loading-indicator/spinnerLoad";
import SearchBar from "@/components/style-components/navbar/searchbar";
import Button from "@/components/style-components/button";
import { toast } from "react-toastify";
import OutgoingTransactionModal from "@/components/style-components/outgoingTransactionModal";
import {
  getAllOutgoingTransactions,
  getWarehouses,
  createTransaction,
  getAllOutgoing,
  updateAndCheck,
} from "@/fetching/outgoingTransaction";
import { FaPlus } from "react-icons/fa6";
import Pagination from "@/components/style-components/pagination";

const TransactionOutgoingPage = () => {
  const columns = [
    { field: "no", label: "No" },
    { field: "user_id", label: "Admin ID" },
    { field: "master_product_id", label: "Product ID" },
    { field: "inventory_id", label: "Inventory ID" },
    { field: "origin", label: "Warehouse" },
    { field: "movement_type", label: "Movement Type" },
    { field: "destination", label: "Delivered to" },
    { field: "quantity", label: "Quantity" },
    { field: "iscondition_good", label: "Product Condition" },
    { field: "arrival_date", label: "Arrival Date" },
    { field: "expiration_date", label: "Expiration Date" },
    { field: "expiration_status", label: "Expiration Status" },
  ];

  const [transaction, setTransaction] = useState([]);
  const [page, setPage] = useState(1);
  const [warehouse, setWarehouse] = useState({
    id: null,
    label: "Default Warehouse",
  });
  const [warehouses, setWarehouses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchWarehouses = async () => {
    try {
      const data = await getWarehouses();
      let warehouse = [];
      for (const i in data) {
        warehouse[i] = {
          id: data[i].id,
          label: data[i].name,
        };
      }
      setWarehouses(warehouse);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOutgoingTransaction = async (warehouse, page) => {
    try {
      let data;
      if (warehouse.id) {
        data = await getAllOutgoingTransactions(warehouse.id, page);
      } else {
        data = await getAllOutgoing(page);
      }
      const transformedData = data.data.map((transaction) => ({
        ...transaction,
        iscondition_good: transaction.iscondition_good ? "Good" : "Damaged",
        expiration_status: transaction.expiration_status
          ? "Expired"
          : "Not Expired",
      }));
      setTransaction(transformedData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTransaction = async (formData) => {
    try {
      await createTransaction(formData);
      setIsModalOpen(false);
      fetchOutgoingTransaction(warehouse, page);
      toast.success("Transaction created successfully!");
    } catch (err) {
      toast.error(err.response.data.message)
      console.error(err);
    }
  };

  const handleUpdateExpirationStatus = async () => {
    try {
      await updateAndCheck();
      toast.success(
        "Check & Update success! Removed expired products from inventory"
      );
      fetchOutgoingTransaction(warehouse, page);
    } catch (err) {
      toast.error("There is no expired product");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

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

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter transactions based on the search term
  const filteredTransactions = transaction.filter((txn) => {
    return Object.values(txn).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-4 sm:ml-64">
      <div className="mt-14 rounded-lg p-4 dark:border-gray-700">
        <h1 className="mt-4 mb-6 text-2xl text-gray-800">
          Outgoing Transaction
        </h1>

        <div className="relative overflow-x-auto">
          <div className="flex flex-wrap items-center justify-between space-y-4 bg-white py-4 md:flex-row md:space-y-0 dark:bg-gray-900">
            <div className="flex items-center gap-4">
              <p>Select warehouse: </p>
              <Dropdown options={warehouses} onSelect={setWarehouse} />
            </div>
            <div>
              <SearchBar className="w-50" onChange={handleSearchInputChange} />
            </div>
            <div>
              <Button className="mr-4 bg-blue-400 hover:bg-blue-500" onClick={handleUpdateExpirationStatus}>
                Check & Update
              </Button>
              <Button onClick={() => setIsModalOpen(true)} className=" bg-green-500 hover:bg-green-600">
                Create Transaction
              </Button>
            </div>
          </div>
          <Table columns={columns} data={filteredTransactions} />
          <div className="flex justify-between mt-4">
            <Button onClick={handlePreviousPage} disabled={page === 1} className="mr-4 bg-blue-400 hover:bg-blue-500">
              Previous
            </Button>
            <span>Page {page}</span>
            <Button onClick={handleNextPage} className="mr-4 bg-blue-400 hover:bg-blue-500">Next</Button>
          </div>
        </div>
      </div>
      <OutgoingTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTransaction}
      />
    </div>
  );
};

export default TransactionOutgoingPage;

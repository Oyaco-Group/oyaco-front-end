import TableOrder from "@/components/style-components/TableOrder";
import { useState, useEffect } from "react";
import Dropdown from "@/components/style-components/dropdown";
import SpinnerLoad from "@/components/style-components/loading-indicator/spinner-load";
import SearchBar from "@/components/style-components/navbar/searchbar";
import Button from "@/components/style-components/button";

const TransactionOutgoingPage = () => {
  const columns = [
    { field: "id", label: "ID" },
    { field: "user_id", label: "Admin ID" },
    { field: "master_product_id", label: "Product ID" },
    { field: "inventory_id", label: "Inventory ID" },
    { field: "destination", label: "Deliverd to" },
    { field: "quantity", label: "Quantity" },
    { field: "arrival_date", label: "Date" },
    { field: "expiration_date", label: "Expiration Date" },
    { field: "action", label: "Action" },
  ];

  const [transaction, setTransaction] = useState([]);

  const fetchOutgoingTransaction = async () => {
    try {
      const data = await getAllTransactions();
      setTransaction(data.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchOutgoingTransaction();
  });

  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="mt-14 rounded-lg p-4 dark:border-gray-700">
          <h1 className="mt-4 mb-6 text-2xl text-gray-800">
            {" "}
            Outgoing Transaction{" "}
          </h1>
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
                <Button> Create Transaction </Button>
              </div>
            </div>
            <div className="flex items-center justify-center"></div>
            <TableOrder columns={columns} data={transaction} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionOutgoingPage;

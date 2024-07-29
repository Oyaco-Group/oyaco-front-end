import React, { useState, useEffect } from "react";
import Table from "@/components/style-components/table";
import SearchBar from "@/components/style-components/navbar/searchbar";
import SpinnerLoad from "@/components/style-components/loading-indicator/spinner-load";
import EditWarehouseModal from "@/pages/warehouses/edit";
import AddWarehouseModal from "@/pages/warehouses/add";
import {
  fetchWarehouse,
  createWarehouse,
  editWarehouse,
  deleteWarehouse,
} from "@/fetching/warehouses";
import Button from "@/components/style-components/button";
import { FaPlus } from "react-icons/fa6";

const TransactionIncomingPage = () => {
  const columns = [
    { field: "no", label: "No" },
    { field: "name", label: "Name" },
    { field: "location", label: "Location" },
    { field: "Edit", label: "Edit" },
    { field: "Delete", label: "Delete" },
  ];

  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalEditWarehouse, setModalEditWarehouse] = useState(null);
  const [searchWarehouse, setSearchWarehouse] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const warehouseData = await fetchWarehouse();
      const processedData = processWarehouseData(warehouseData);
      setOriginalData(processedData);
      setFilteredData(processedData);
    } catch (error) {
      console.error("Error fetching warehouse data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const processWarehouseData = (data) => {
    if (Array.isArray(data)) {
      return data.map((warehouse, index) => ({
        id: warehouse.id,
        no: index + 1,
        name: warehouse.name,
        location: warehouse.location,
        ...warehouse,
      }));
    } else {
      throw new Error("Invalid data format from server");
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchWarehouse(value);
    filterWarehouse(value);
  };

  const filterWarehouse = (valueSearch) => {
    let filteredWarehouse = originalData;

    if (valueSearch) {
      filteredWarehouse = filteredWarehouse.filter(
        (warehouse) =>
          warehouse.name.toLowerCase().includes(valueSearch.toLowerCase()) ||
          warehouse.location.toLowerCase().includes(valueSearch.toLowerCase())
      );
    }
    setFilteredData(filteredWarehouse);
  };

  const handleEdit = (warehouse) => {
    setModalEditWarehouse(warehouse);
    setIsModalOpen(true);
  };

  const handleDelete = async (warehouse) => {
    try {
      await deleteWarehouse(parseInt(warehouse.id, 10));
      fetchData();
    } catch (error) {
      console.error("Error deleting warehouse:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalEditWarehouse(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  const handleSaveChanges = async (id, data) => {
    try {
      await editWarehouse({ id, ...data });
      fetchData();
      onClose();
    } catch (error) {
      console.error("Error saving warehouse data:", error);
    }
  };
  return (
    <div className='p-4 sm:ml-64'>
      <div className='mt-14 rounded-lg p-4 dark:border-gray-700'>
        <h1 className='mt-4 mb-4 text-2xl text-gray-800'>List Warehouse</h1>
        <div className='relative overflow-x-auto'>
          <div className='flex flex-wrap items-center justify-between space-y-4 bg-white py-4 md:flex-row md:space-y-0 dark:bg-gray-900'>
            <div>
              <SearchBar
                className='w-72'
                onChange={handleSearchChange}
                value={searchWarehouse}
              />
            </div>
            <Button
              className='bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-0 flex gap-2 items-center justify-between'
              onClick={openAddModal}
            >
              <FaPlus />
              Add Warehouse
            </Button>
          </div>
          <div className='flex items-center justify-center'>
            {isLoading && <SpinnerLoad />}
          </div>
          {!isLoading && (
            <Table
              columns={columns}
              data={filteredData}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
      <EditWarehouseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalEditWarehouse={modalEditWarehouse}
        fetchData={fetchData}
        onSave={handleSaveChanges}
        onDelete={deleteWarehouse}
      />
      <AddWarehouseModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        fetchData={fetchData}
      />
    </div>
  );
};

export default TransactionIncomingPage;

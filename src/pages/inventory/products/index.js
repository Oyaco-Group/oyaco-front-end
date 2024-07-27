import React, { useState, useEffect } from "react";
import Table from "@/components/style-components/table";
import SearchBar from "@/components/style-components/navbar/searchbar";
import SpinnerLoad from "@/components/style-components/loading-indicator/spinner-load";
import { fetchMaster, editProducts, deleteProducts } from "@/fetching/products";
import Button from "@/components/style-components/button";
import { FaPlus } from "react-icons/fa6";
import EditProductsModal from "@/pages/inventory/products/edit";
import AddProductModal from "@/pages/inventory/products/add";

const ProductsPage = () => {
  const columns = [
    { field: "no", label: "No" },
    { field: "image", label: "Image" },
    { field: "name", label: "Name" },
    { field: "sku", label: "SKU" },
    { field: "price", label: "Price" },
    { field: "category_name", label: "Category" },
    { field: "Edit", label: "Edit" },
  ];

  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchMaster, setSearchMaster] = useState("");
  const [modalEditProducts, setModalEditProducts] = useState(null);
  const [page, setPage] = useState(1); // for pagination
  const [limit, setLimit] = useState(15); // items per page

  const Products = async () => {
    try {
      const data = await fetchMaster(page, limit);
      const processMasterData = MasterData(data);
      setOriginalData(processMasterData);
      setFilteredData(processMasterData);
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching master product data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Products();
  }, [page, limit]);

  const MasterData = (data) => {
    if (Array.isArray(data)) {
      return data.map((masterProduct, index) => ({
        id: masterProduct.id,
        no: index + 1,
        name: masterProduct.name,
        price: masterProduct.price,
        category_name: masterProduct.category.name,
        image: `http://localhost:8080/api/images/${masterProduct.image}`,
      }));
    } else {
      throw new Error("Invalid data format from server");
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchMaster(value);
    filterMaser(value);
  };

  const filterMaser = (valueSearch) => {
    let filteredMaster = originalData;

    if (valueSearch) {
      filteredMaster = filteredMaster.filter(
        (master) =>
          master.name.toLowerCase().includes(valueSearch.toLowerCase()) ||
          master.sku.toLowerCase().includes(valueSearch.toLowerCase())
      );
    }
    setFilteredData(filteredMaster);
  };

  const handleEdit = (masterProduct) => {
    setModalEditProducts(masterProduct);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalEditProducts(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  return (
    <div className='p-4 sm:ml-64'>
      <div className='mt-14 rounded-lg p-4 dark:border-gray-700'>
        <h1 className='mt-4 mb-4 text-2xl text-gray-800'>Master Product</h1>
        <div className='relative overflow-x-auto'>
          <div className='flex flex-wrap items-center justify-between space-y-4 bg-white py-4 md:flex-row md:space-y-0 dark:bg-gray-900'>
            <div>
              <SearchBar
                className='w-72'
                onChange={handleSearchChange}
                value={searchMaster}
              />
            </div>
            <Button
              className='bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-0 flex gap-2 items-center justify-between'
              onClick={openAddModal}
            >
              <FaPlus />
              Add Products
            </Button>
          </div>
          {isLoading ? (
            <SpinnerLoad />
          ) : (
            <Table
              columns={columns}
              fetchData={fetchMaster}
              data={originalData}
              onEdit={handleEdit}
              render={(row, column) => {
                if (column.field === "image") {
                  return row.image ? (
                    <img
                      src={row.image}
                      alt={row.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    "No Image"
                  );
                }
                return row[column.field];
              }}
            />
          )}
        </div>
      </div>
      <EditProductsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalEditProducts={modalEditProducts}
        fetchData={Products}
        onSave={editProducts}
        onDelete={deleteProducts}
      />
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        fetchData={Products}
      />
    </div>
  );
};

export default ProductsPage;

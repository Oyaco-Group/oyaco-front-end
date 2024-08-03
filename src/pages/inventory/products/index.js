import React, { useState, useEffect } from "react";
import Table from "@/components/style-components/table";
import SearchBar from "@/components/style-components/navbar/searchbar";
import SpinnerLoad from "@/components/style-components/loading-indicator/spinnerLoad";
import { fetchMaster, editProducts, deleteProducts } from "@/fetching/products";
import Button from "@/components/style-components/button";
import { FaPlus } from "react-icons/fa6";
import EditProductsModal from "@/pages/inventory/products/edit";
import AddProductModal from "@/pages/inventory/products/add";
import Pagination from "@/components/style-components/pagination";

const ProductsPage = () => {
  const columns = [
    { field: "no", label: "No" },
    { field: "imageMaster", label: "Image" },
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
  const [limit, setLimit] = useState(5); // items per page
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const Products = async () => {
    try {
      const data = await fetchMaster(page, limit);
      const processMasterData = MasterData(data.masterProduct);
      setOriginalData(processMasterData);
      setFilteredData(processMasterData);
      setTotalPages(data.totalPages);
      setTotalProducts(processMasterData.length);
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
        price: formatPrice(masterProduct.price),
        sku: masterProduct.sku,
        category_name: masterProduct.category.name,
        imageMaster: masterProduct.image
          ? `http://localhost:8080/api/images/${masterProduct.image}`
          : "/no-image.jpg",
      }));
    } else {
      throw new Error("Invalid data format from server");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchMaster(value);
    filterMaser(value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
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
    console.log(originalData);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  return (
    <div className="p-4 sm:ml-64">
      <div className="mt-14 rounded-lg p-4 dark:border-gray-700">
        <h1 className="mt-4 mb-4 text-2xl text-gray-800">Master Product</h1>
        <div className="relative overflow-x-auto">
          <div className="flex flex-wrap items-center justify-between space-y-4 bg-white py-4 md:flex-row md:space-y-0 dark:bg-gray-900">
            <div>
              <SearchBar
                className="w-72"
                onChange={handleSearchChange}
                value={searchMaster}
              />
            </div>
            <Button
              className="bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-0 flex gap-2 items-center justify-between"
              onClick={openAddModal}
            >
              <FaPlus />
              Add Products
            </Button>
          </div>
          {isLoading ? (
            <SpinnerLoad />
          ) : (
            <>
              {" "}
              <Table
                columns={columns}
                fetchData={fetchMaster}
                data={filteredData}
                onEdit={handleEdit}
                render={(row, column) => {
                  if (column.field === "imageMaster") {
                    return row.imageMaster ? (
                      <img
                        src={
                          row.imageMaster ||
                          "/docs/images/examples/image-1@2x.jpg"
                        }
                        alt={row.name}
                      />
                    ) : (
                      "No Image"
                    );
                  }
                  return row[column.field];
                }}
              />
              <div className="flex justify-between mt-4">
                <span>Total: {totalProducts}</span>
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
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

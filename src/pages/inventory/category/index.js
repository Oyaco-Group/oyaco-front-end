import React, { useState, useEffect } from "react";
import Table from "@/components/style-components/table";
import SearchBar from "@/components/style-components/navbar/searchbar";
import SpinnerLoad from "@/components/style-components/loading-indicator/spinner-load";
import EditCategoryModal from "@/pages/inventory/category/edit";
import {
  fetchCategory,
  editCategory,
  deleteCategory,
} from "@/fetching/category";

const CategoryPage = () => {
  const columns = [
    { field: "no", label: "No" },
    { field: "name", label: "Name" },
    { field: "action", label: "Action" },
  ];

  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEditCategory, setModalEditCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const categoryData = await fetchCategory();
      const processedData = processCategoryData(categoryData);
      setOriginalData(processedData);
      setFilteredData(processedData);
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const processCategoryData = (data) => {
    if (Array.isArray(data)) {
      return data.map((category, index) => ({
        id: category.id,
        no: index + 1,
        name: category.name,
        ...category,
      }));
    } else {
      throw new Error("Invalid data format from server");
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchCategory(value);
    filterCategory(value);
  };

  const filterCategory = (valueSearch) => {
    let filteredCategory = originalData;

    if (valueSearch) {
      filteredCategory = filteredCategory.filter((category) =>
        category.name.toLowerCase().includes(valueSearch.toLowerCase()),
      );
    }
    setFilteredData(filteredCategory);
  };

  const handleEdit = (category) => {
    setModalEditCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalEditCategory(null);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="mt-14 rounded-lg p-4 dark:border-gray-700">
        <h1 className="mb-4 mt-4 text-2xl text-gray-800">List Category</h1>
        <div className="relative overflow-x-auto">
          <div className="flex flex-wrap items-center justify-between space-y-4 bg-white py-4 md:flex-row md:space-y-0 dark:bg-gray-900">
            <div>
              <SearchBar
                className="w-72"
                onChange={handleSearchChange}
                value={searchCategory}
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            {isLoading && <SpinnerLoad />}
          </div>
          {!isLoading && (
            <Table columns={columns} data={filteredData} onEdit={handleEdit} />
          )}
        </div>
      </div>
      <EditCategoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalEditCategory={modalEditCategory}
        fetchData={fetchData}
        onSave={editCategory}
        onDelete={deleteCategory}
      />
    </div>
  );
};

export default CategoryPage;

import React, { useState, useEffect } from "react";
import Modal from "@/components/style-components/modal";
import InputField from "@/components/style-components/form/inputField";
import Button from "@/components/style-components/button";
import { createProducts } from "@/fetching/products";
import { fetchCategory } from "@/fetching/category";
import { toast } from "react-toastify";

const AddProductModal = ({ isOpen, onClose, fetchData }) => {
  const [productData, setProductData] = useState({
    name: "",
    sku: "",
    price: "",
    category_id: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchCategory();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories. Please try again later.");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSaveProduct = async () => {
    try {
      await createProducts(productData);
      toast.success("Successfully product created");
      onClose();
      fetchData();
    } catch (error) {
      console.error("Error creating product:", error);
      if (error.response && error.response.status === 404) {
        toast.error("Category not found. Please check the category ID.");
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
  // Tambah Toast buat handle error ya intinya klo kategori gaada
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Product">
      <InputField
        id="name"
        type="text"
        value={productData.name}
        onChange={handleChange}
        placeholder="Product Name"
      />
      <InputField
        id="sku"
        type="text"
        value={productData.sku}
        onChange={handleChange}
        placeholder="SKU"
      />
      <InputField
        id="price"
        type="number"
        value={productData.price}
        onChange={handleChange}
        placeholder="Price"
        min={1}
      />

      <div className="mb-4">
        <select
          id="category_id"
          value={productData.category_id}
          onChange={handleChange}
          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <Button
          type="button"
          onClick={handleSaveProduct}
          className="bg-green-500 hover:bg-green-600"
        >
          Add Product
        </Button>
      </div>
    </Modal>
  );
};

export default AddProductModal;

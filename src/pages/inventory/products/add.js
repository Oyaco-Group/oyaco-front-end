import React, { useState } from "react";
import Modal from "@/components/style-components/modal";
import InputField from "@/components/style-components/form/inputField";
import Button from "@/components/style-components/button";
import { createProducts } from "@/fetching/products";
import { toast } from "react-toastify";

const AddProductModal = ({ isOpen, onClose, fetchData }) => {
  const [productData, setProductData] = useState({
    name: "",
    sku: "",
    price: "",
    category_id: "",
    image: null,
  });

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
      console.log("Product created:", productData);
      onClose();
      fetchData(); // Fetch updated product list
    } catch (error) {
      console.error("Error creating product:", error);
      if (error.response && error.response.status === 404) {
        toast.error("Category not found. Please check the category ID.");
      } else {
        toast.error("Category doesn't exist");
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
      <InputField
        id="category_id"
        type="number"
        value={productData.category_id}
        onChange={handleChange}
        placeholder="Category ID"
        min={1}
      />
      <div>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex justify-center gap-4">
        <Button type="button" onClick={handleSaveProduct}>
          Add Product
        </Button>
      </div>
    </Modal>
  );
};

export default AddProductModal;

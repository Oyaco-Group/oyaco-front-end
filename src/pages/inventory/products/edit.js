import React, { useState, useEffect } from "react";
import Modal from "@/components/style-components/modal";
import InputField from "@/components/style-components/form/inputField";
import Button from "@/components/style-components/button";
import { AiOutlineDelete } from "react-icons/ai";
import { fetchCategory } from "@/fetching/category";
import PopupConfirmation from "@/components/style-components/popupConfirmation";
import { toast } from "react-toastify";

const EditProductsModal = ({
  isOpen,
  onClose,
  modalEditProducts,
  fetchData,
  onSave,
  onDelete,
}) => {
  const [tempData, setTempData] = useState({
    id: "",
    name: "",
    category_id: "",
    price: "",
    sku: "",
    image: null,
    isdelete: false,
  });

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (modalEditProducts) {
      setTempData({
        id: modalEditProducts.id || "",
        name: modalEditProducts.name || "",
        category_id: modalEditProducts.category_id || "",
        price: modalEditProducts.price || "",
        sku: modalEditProducts.sku || "",
        image: null, // Image will be uploaded separately
        isdelete: modalEditProducts.isdelete || false,
      });
    } else {
      setTempData({
        id: "",
        name: "",
        category_id: "",
        price: "",
        sku: "",
        image: null,
        isdelete: false,
      });
    }
  }, [modalEditProducts]);

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
    setTempData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTempData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      for (const key in tempData) {
        if (tempData[key] !== null && tempData[key] !== undefined) {
          formData.append(key, tempData[key]);
        }
      }

      await onSave(tempData.id, tempData);
      toast.success("Successfully product edited");
      fetchData();
      onClose();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(tempData.id);
      fetchData();
      toast.success("Product deleted successfully");
      setIsConfirmationOpen(false);
      onClose();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setIsConfirmationOpen(false);
      }}
      title="Edit Product"
    >
      <InputField
        id="name"
        type="text"
        value={tempData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="text-gray-400"
      />

      <div className="mb-4">
        <select
          id="category_id"
          value={tempData.category_id}
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

      <InputField
        id="price"
        type="number"
        value={tempData.price}
        onChange={handleChange}
        placeholder="Price"
        className="text-gray-400"
        min={0}
      />
      <InputField
        id="sku"
        type="text"
        value={tempData.sku}
        onChange={handleChange}
        placeholder="SKU"
        className="text-gray-400"
      />
      <div className="mb-4">
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-gray-400"
        />
      </div>
      <div className="flex justify-center gap-4">
        <Button type="button" onClick={handleSaveChanges}>
          Save Changes
        </Button>
        <Button
          type="button"
          onClick={() => setIsConfirmationOpen(true)}
          className="bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-0 flex items-center gap-2"
        >
          <AiOutlineDelete className="mr-2 h-4 w-4 flex-shrink-0" />
          Delete
        </Button>
      </div>
      {isConfirmationOpen && (
        <PopupConfirmation
          message="Are you sure you want to delete this product?"
          onConfirm={handleDelete}
          onCancel={() => setIsConfirmationOpen(false)}
        />
      )}
    </Modal>
  );
};

export default EditProductsModal;

import React, { useState } from "react";
import Modal from "@/components/style-components/modal";
import InputField from "@/components/style-components/form/inputField";
import Button from "@/components/style-components/button";
import { createCategory } from "@/fetching/category";
import { toast } from "react-toastify";

const AddCategoryModal = ({ isOpen, onClose, fetchData }) => {
  const [tempData, setTempData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTempData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await createCategory(tempData.name);
      fetchData();
      onClose();
      toast.success("Successfully category created");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Category">
      <InputField
        id="name"
        type="text"
        value={tempData.name}
        onChange={handleChange}
        placeholder="Category Name"
        className="text-gray-400"
      />
      <div className="flex justify-center gap-4">
        <Button
          type="button"
          onClick={handleSaveChanges}
          className="bg-green-500 hover:bg-green-600"
        >
          Add Category
        </Button>
      </div>
    </Modal>
  );
};

export default AddCategoryModal;

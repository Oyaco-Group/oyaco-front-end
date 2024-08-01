import React, { useState, useEffect } from "react";
import Modal from "@/components/style-components/modal";
import InputField from "@/components/style-components/form/inputField";
import Button from "@/components/style-components/button";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const EditCategoryModal = ({
  isOpen,
  onClose,
  modalEditCategory,
  fetchData,
  onSave,
  onDelete,
}) => {
  const [tempData, setTempData] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    if (modalEditCategory) {
      setTempData({
        id: modalEditCategory.id || "",
        name: modalEditCategory.name || "",
      });
    } else {
      setTempData({
        id: "",
        name: "",
      });
    }
  }, [modalEditCategory]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTempData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await onSave(tempData.id, tempData.name);
      fetchData();
      onClose();
      toast.success("Successfully category edited");
    } catch (error) {
      console.error("Error saving category data:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Category">
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
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default EditCategoryModal;

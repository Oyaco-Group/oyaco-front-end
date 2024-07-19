import React, { useState, useEffect } from "react";
import Modal from "@/components/style-components/modal";
import InputField from "@/components/style-components/form/input-field";
import Button from "@/components/style-components/button";
import { AiOutlineDelete } from "react-icons/ai";

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
    } catch (error) {
      console.error("Error saving category data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (tempData.id) {
        await onDelete(tempData.id);
        fetchData();
        onClose();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Edit Category'>
      <InputField
        id='name'
        type='text'
        value={tempData.name}
        onChange={handleChange}
        placeholder='Category Name'
        className='text-gray-400'
      />
      <div className='flex justify-center gap-4'>
        {tempData.id && (
          <Button
            type='button'
            className='text-red-important flex items-center bg-red-100 hover:bg-red-600'
            size='md'
            onClick={handleDelete}
          >
            <AiOutlineDelete className='mr-2 h-4 w-4 flex-shrink-0' />
            Delete
          </Button>
        )}
        <Button type='button' onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default EditCategoryModal;

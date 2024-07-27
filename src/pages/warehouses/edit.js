import React, { useState, useEffect } from "react";
import Modal from "@/components/style-components/modal";
import InputField from "@/components/style-components/form/input-field";
import Button from "@/components/style-components/button";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const EditWarehouseModal = ({
  isOpen,
  onClose,
  modalEditWarehouse,
  fetchData,
  onSave,
  onDelete,
}) => {
  const [tempData, setTempData] = useState({
    id: "",
    name: "",
    location: "",
  });

  useEffect(() => {
    if (modalEditWarehouse) {
      setTempData({
        id: modalEditWarehouse.id || "",
        name: modalEditWarehouse.name || "",
        location: modalEditWarehouse.location || "",
      });
    } else {
      setTempData({
        id: "",
        name: "",
        location: "",
      });
    }
  }, [modalEditWarehouse]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTempData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await onSave(tempData.id, {
        name: tempData.name,
        location: tempData.location,
      });
      fetchData();
      onClose();
      toast.success();
    } catch (error) {
      console.error("Error saving warehouse data:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Edit Warehouse'>
      <InputField
        id='name'
        type='text'
        value={tempData.name}
        onChange={handleChange}
        placeholder='Warehouse Name'
        className='text-gray-400'
      />
      <InputField
        id='location'
        type='text'
        value={tempData.location}
        onChange={handleChange}
        placeholder='Warehouse Location'
        className='text-gray-400'
      />
      <div className='flex justify-center gap-4'>
        <Button type='button' onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default EditWarehouseModal;

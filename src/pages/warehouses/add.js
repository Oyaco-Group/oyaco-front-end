import React, { useState } from "react";
import Modal from "@/components/style-components/modal";
import InputField from "@/components/style-components/form/input-field";
import Button from "@/components/style-components/button";
import { createWarehouse } from "@/fetching/warehouses";

const AddWarehouseModal = ({ isOpen, onClose, fetchData }) => {
  const [tempData, setTempData] = useState({
    name: "",
    location: "",
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
      await createWarehouse({
        name: tempData.name,
        location: tempData.location,
      });
      console.log("Warehouse created:", tempData);
      onClose();
      fetchData();
    } catch (error) {
      console.error("Error creating warehouse:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Add Warehouse'>
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
        <Button
          className='bg-green-400 hover:bg-green-500'
          type='button'
          onClick={handleSaveChanges}
        >
          Add Warehouse
        </Button>
      </div>
    </Modal>
  );
};

export default AddWarehouseModal;

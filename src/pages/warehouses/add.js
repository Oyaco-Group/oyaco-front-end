import React, { useState } from "react";
import Modal from "@/components/style-components/modal";
import InputField from "@/components/style-components/form/inputField";
import Button from "@/components/style-components/button";
import { createWarehouse } from "@/fetching/warehouses";
import { toast } from "react-toastify";

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
      fetchData();
      toast.success("Successfully warehouse created");
    } catch (error) {
      console.error("Error creating warehouse:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Warehouse">
      <InputField
        id="name"
        type="text"
        value={tempData.name}
        onChange={handleChange}
        placeholder="Warehouse Name"
        className="text-gray-400"
      />
      <InputField
        id="location"
        type="text"
        value={tempData.location}
        onChange={handleChange}
        placeholder="Warehouse Location"
        className="text-gray-400"
      />
      <div className="flex justify-center gap-4">
        <Button
          className="bg-green-500 hover:bg-green-600"
          type="button"
          onClick={handleSaveChanges}
        >
          Add Warehouse
        </Button>
      </div>
    </Modal>
  );
};

export default AddWarehouseModal;

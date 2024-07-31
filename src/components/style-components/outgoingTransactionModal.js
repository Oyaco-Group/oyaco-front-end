// components/TransactionModal.js
import { useState } from "react";
import Modal from "@/components/style-components/modal";
import Button from "@/components/style-components/button";
import { toast } from "react-toastify";

const OutgoingTransactionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    user_id: "",
    master_product_id: "",
    origin: "",
    destination: "",
    quantity: "",
    iscondition_good: true,
    expiration_status: false,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "radio" ? value === "true" : value,
    });
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const formDataToSend = {
        ...formData,
        quantity: Number(formData.quantity),
        user_id: Number(formData.user_id),
        master_product_id: Number(formData.master_product_id),
      };

      if (isNaN(formDataToSend.quantity) || formDataToSend.quantity <= 0) {
        alert("Please enter a valid quantity");
        return;
      }

      onSubmit(formDataToSend);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <h1 className="text-2xl text-gray-800 mb-4">Create Transaction</h1>
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/3">User ID</label>
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            className="w-2/3 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/3">Product ID</label>
          <input
            type="text"
            name="master_product_id"
            value={formData.master_product_id}
            onChange={handleChange}
            className="w-2/3 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/3">Origin</label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            className="w-2/3 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/3">Destination</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-2/3 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/3">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-2/3 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/3">Condition</label>
          <div className="flex items-center space-x-4 w-2/3">
            <label className="flex items-center">
              <input
                type="radio"
                name="iscondition_good"
                value="true"
                checked={formData.iscondition_good === true}
                onChange={handleChange}
                className="h-5 w-5"
              />
              <span className="ml-2 mr-4">Good</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="iscondition_good"
                value="false"
                checked={formData.iscondition_good === false}
                onChange={handleChange}
                className="h-5 w-5"
              />

              <span className="ml-2">Damaged</span>
            </label>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/3">Expiration Status</label>
          <div className="flex items-center space-x-4 w-2/3">
            <label className="flex items-center">
              <input
                type="radio"
                name="expiration_status"
                value="true"
                checked={formData.expiration_status === true}
                onChange={handleChange}
                className="h-5 w-5"
              />
              <span className="ml-2">Expired</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="expiration_status"
                value="false"
                checked={formData.expiration_status === false}
                onChange={handleChange}
                className="h-5 w-5"
              />
              <span className="ml-2">Not Expired</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default OutgoingTransactionModal;

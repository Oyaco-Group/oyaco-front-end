import React, { useState, useEffect } from "react";
import Modal from "@/components/style-components/modal.js";
import InputField from "@/components/style-components/form/input-field";
import TextareaField from "@/components/style-components/form/textarea-field";
import Button from "@/components/style-components/button";
import { AiOutlineDelete } from "react-icons/ai";
import { fetchUpdateUser, fetchDeleteUser } from "@/fetching/user"; // Import the new function
import { toast } from "react-toastify";

const EditProfileModal = ({ isOpen, onClose, modalEditUser, fetchData }) => {
  const [tempData, setTempData] = useState({
    id: "",
    image: "",
    name: "",
    email: "",
    password: "",
    address: "",
  });

  useEffect(() => {
    if (modalEditUser) {
      console.log("Received modalEditUser:", modalEditUser); // Log data
      setTempData({
        id: modalEditUser.id || "",
        image: modalEditUser.image_url || "",
        name: modalEditUser.name || "",
        email: modalEditUser.email || "",
        password: "", // Initialize empty for new passwords
        address: modalEditUser.address || "",
      });
    }
  }, [modalEditUser]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTempData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      await fetchDeleteUser(tempData.id); // Use the new delete function
      toast.success("User deleted successfully");
      onClose();
      fetchData(); // Refresh data
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response || error.message || error
      );
      toast.error("Failed to delete user");
    }
  };

  const handleSaveChanges = async () => {
    // Basic validation
    if (!tempData.name) {
      toast.error("Name is required");
      return;
    }
    if (!tempData.email) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempData.email)) {
      toast.error("Invalid email format");
      return;
    }

    if (tempData.password.length < 5) {
      toast.error("Password must be at least 5 characters long");
      return; // Stop if validation fails
    }

    if (!tempData.address) {
      toast.error("Address is required");
      return;
    }

    try {
      console.log("Updating user with data:", tempData);
      await fetchUpdateUser(tempData);
      toast.success("User updated successfully");
      onClose();
      fetchData();
    } catch (error) {
      console.error(
        "Error updating user data:",
        error.response || error.message || error
      );
      const errorMessage =
        error.response?.data?.message || "Failed to update user";
      toast.error(errorMessage);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <img
        className="mx-auto mb-8 h-24 w-24 rounded-full border-4 border-blue-400 shadow-sm"
        src={tempData.image || "/avatar.png"}
        alt={tempData.name}
      />
      <h1 className="mb-4 flex items-start font-normal">Personal</h1>
      <InputField
        id="name"
        type="text"
        value={tempData.name}
        onChange={handleChange}
        placeholder="Username"
        className="text-gray-400"
      />
      <InputField
        id="email"
        type="email"
        value={tempData.email}
        onChange={handleChange}
        placeholder="Email"
        className="text-gray-400"
      />
      <InputField
        id="password"
        type="password"
        value={tempData.password}
        onChange={handleChange}
        placeholder="New Password"
        className="text-gray-400"
      />
      <TextareaField
        id="address"
        rows="4"
        value={tempData.address}
        onChange={handleChange}
        placeholder="Write your address here..."
        className="text-gray-400"
      />
      <div className="flex justify-center gap-4">
        <Button
          type="button"
          className="text-red-important flex items-center bg-red-100 hover:bg-red-600"
          size="md"
          onClick={handleDelete}
        >
          <AiOutlineDelete className="mr-2 h-4 w-4 flex-shrink-0" />
          Delete
        </Button>
        <Button type="button" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default EditProfileModal;

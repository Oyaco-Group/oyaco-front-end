import React, { useState, useEffect } from "react";
import Modal from "@/components/style-components/modal.js";
import InputField from "@/components/style-components/form/inputField";
import TextareaField from "@/components/style-components/form/textareaField";
import Button from "@/components/style-components/button";
import { AiOutlineDelete } from "react-icons/ai";
import { fetchUpdateUser, fetchDeleteUser } from "@/fetching/user";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PopupConfirmation from "@/components/style-components/popupConfirmation";

const EditProfileModal = ({ isOpen, onClose, modalEditUser, fetchData }) => {
  const [tempData, setTempData] = useState({
    id: "",
    image: "",
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    if (modalEditUser) {
      setTempData({
        id: modalEditUser.id || "",
        image: modalEditUser.image_url || "",
        name: modalEditUser.name || "",
        email: modalEditUser.email || "",
        password: "",
        address: modalEditUser.address || "",
      });
    } 
    setIsConfirmationOpen(false);
  }, [modalEditUser]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTempData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      const response = await fetchDeleteUser(tempData.id);
      toast.success(response.message);
      setIsConfirmationOpen(false); // Reset confirmation state after delete
      onClose();
      fetchData();
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response || error.message || error
      );
      toast.error("Failed to delete user");
    }
  };

  const handleSaveChanges = async () => {
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

    if (!tempData.address) {
      toast.error("Address is required");
      return;
    }

    try {
      await fetchUpdateUser({
        userId: tempData.id,
        name: tempData.name,
        email: tempData.email,
        password: tempData.password,
        address: tempData.address,
      });
      toast.success("User updated successfully");
      onClose();
      fetchData();
    } catch (error) {
      console.error("Error updating user data:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update user";
      toast.error(errorMessage);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setIsConfirmationOpen(false);
      }}
      title="Edit Profile"
    >
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
      <div className="relative">
        <InputField
          id="password"
          type={showPassword ? "text" : "password"}
          value={tempData.password}
          onChange={handleChange}
          placeholder="New Password"
          className="text-gray-400"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
          ) : (
            <AiOutlineEye className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
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
          className="flex items-center bg-red-600 hover:bg-red-700"
          size="md"
          onClick={() => setIsConfirmationOpen(true)}
        >
          <AiOutlineDelete className="mr-2 h-4 w-4 flex-shrink-0" />
          Delete
        </Button>
        <Button
          className="bg-green-500 hover:bg-green-600"
          type="button"
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </div>

      {isConfirmationOpen && (
        <PopupConfirmation
          message="Are you sure you want to delete this user?"
          onConfirm={handleDelete}
          onCancel={() => setIsConfirmationOpen(false)}
        />
      )}
    </Modal>
  );
};

export default EditProfileModal;

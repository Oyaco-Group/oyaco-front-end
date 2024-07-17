import React, { useState } from "react";
import Modal from "@/components/style-components/modal";
import InputField from "@/components/style-components/form/input-field";
import TextareaField from "@/components/style-components/form/textarea-field";
import Button from "@/components/style-components/button";
import { AiOutlineDelete } from "react-icons/ai";

const EditProfileModal = ({ isOpen, onClose, modalEditUser, fetchData }) => {
  const [tempData, setTempData] = useState({
    id: modalEditUser?.id || "",
    image: modalEditUser?.image_url || "",
    name: modalEditUser?.name || "",
    email: modalEditUser?.email || "",
    password: modalEditUser?.password || "",
    address: modalEditUser?.address || "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTempData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      console.log("Data deleted:", modalEditUser);
      onClose();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      console.log("Changes saved:", tempData);
      onClose();
      fetchData();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const defaultImage = "/avatar.png";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <img
        className="mx-auto mb-8 h-24 w-24 rounded-full border-4 border-blue-400 shadow-sm"
        src={tempData.image || defaultImage}
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
        placeholder="Password"
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

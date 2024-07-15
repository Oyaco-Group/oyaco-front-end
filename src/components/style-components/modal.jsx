import React, { useState, useEffect } from "react";
import InputField from "@/components/style-components/form/input-field";
import TextareaField from "@/components/style-components/form/textarea-field";
import Button from "@/components/style-components/button";
import { AiOutlineDelete } from "react-icons/ai";

const Modal = ({ isOpen, onClose, modalEditUser }) => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    email: "",
    password: "",
    address: "",
  });

  console.log(formData.image);

  useEffect(() => {
    if (modalEditUser) {
      setFormData({
        image: modalEditUser.image_url || "",
        name: modalEditUser.name || "",
        email: modalEditUser.email || "",
        password: modalEditUser.password || "",
        address: modalEditUser.address || "",
      });
    }
  }, [modalEditUser]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const defaultImage =
    "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-2180848911.jpg";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white shadow dark:bg-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-2.5 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={onClose}
        >
          <svg
            className="h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 text-center md:p-5">
          <h1 className="mb-5 text-xl font-normal text-gray-500">
            Edit Profile
          </h1>

          <img
            class="mx-auto mb-8 h-24 w-24 rounded-full border-4 border-blue-400 shadow-sm"
            src={formData.image || "/avatar.png"}
            alt="Bonnie image"
          />

          <h1 className="mb-4 flex items-start font-normal">Personal</h1>
          <InputField
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Username"
            className="text-gray-400"
          />
          <InputField
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="text-gray-400"
          />
          <InputField
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="text-gray-400"
          />
          <TextareaField
            id="address"
            rows="4"
            value={formData.address}
            onChange={handleChange}
            placeholder="Write your address here..."
            className="text-gray-400"
          />
          <div className="flex justify-center gap-4">
            <Button
              type="button"
              className="text-red-important flex items-center bg-red-100 hover:bg-red-600"
              size="md"
              onClick={onClose}
            >
              <AiOutlineDelete className="mr-2 h-4 w-4 flex-shrink-0" />
              Delete
            </Button>

            <Button type="button" onClick={onClose}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

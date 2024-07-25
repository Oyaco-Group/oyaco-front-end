import { useState } from "react";
import Modal from "@/components/style-components/modal"; // Import Modal component
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InputField from "../form/input-field";
import TextareaField from "../form/textarea-field";
import Button from "../button";

const ProfileMenu = (onClose) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
    toast.success("Log out successfully ");
  };

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
      //console.log("Updating user with data:", tempData);
      await fetchUpdateUser({
        userId: user?.id,
        name: user?.name,
        email: user?.email,
        password: user?.password,
        address: user?.address,
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
    <div className="flex items-center">
      <div className="ms-3 flex items-center">
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            className="flex rounded-full bg-white py-1.5 pl-2 pr-5 text-sm focus:ring-4 focus:ring-gray-300"
            aria-expanded={isOpen ? "true" : "false"}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="h-10 w-10 rounded-full"
              src={user?.image_url || "/avatar.png"}
              alt="profile picture"
            />
            <div className="ms-3 space-y-0.5 text-left font-medium text-gray-500 rtl:text-right">
              <div className="mt-2">| {user?.user_role}</div>
            </div>
          </button>

          {isOpen && (
            <div
              className="absolute right-0 mt-[250px] w-48 list-none divide-y divide-gray-100 rounded bg-white text-base shadow-md"
              id="dropdown-user"
            >
              <div className="px-4 py-3">
                <p className="text-sm text-blue-600 dark:text-white">
                  Hi, {user?.name}!
                </p>
                <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-300">
                  {user?.email}
                </p>
              </div>
              <ul className="py-1">
                <li>
                  <button
                    onClick={handleEditProfile}
                    className="block w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-start px-4 py-2 text-sm text-red-600 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
          <img
            className="mx-auto mb-8 h-24 w-24 rounded-full border-4 border-blue-400 shadow-sm"
            src={"/avatar.png"}
            alt={user?.name}
          />
          <h1 className="mb-4 flex items-start font-normal">Personal</h1>
          <InputField
            id="name"
            type="text"
            value={user?.name}
            onChange={handleChange}
            placeholder="Username"
            className="text-gray-400"
          />
          <InputField
            id="email"
            type="email"
            value={user?.email}
            onChange={handleChange}
            placeholder="Email"
            className="text-gray-400"
          />
          <div className="relative">
            <InputField
              id="password"
              type={showPassword ? "text" : "password"}
              value={user?.password}
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
            value={user?.address}
            onChange={handleChange}
            placeholder="Write your address here..."
            className="text-gray-400"
          />
          <div className="flex justify-center gap-4">
            <Button type="button" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProfileMenu;

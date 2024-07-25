import { useState } from "react";
import Modal from "@/components/style-components/modal"; // Import Modal component
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuth();

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
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Edit Profile"
        >
          <div>
            <p>Image: {user?.image_url}</p>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Address: {user?.address}</p>
            {/* <p>Role: {user?.role}</p> */}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProfileMenu;

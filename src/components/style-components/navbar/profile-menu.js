import { useState } from "react";
import Modal from "@/components/style-components/modal"; // Import komponen Modal
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InputField from "../form/input-field";
import TextareaField from "../form/textarea-field";
import Button from "../button";
import { fetchUpdateUser } from "@/fetching/user";

const ProfileMenu = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [tempData, setTempData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    address: user?.address || "",
  });

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
    toast.success("Logout berhasil");
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
      toast.error("Nama diperlukan");
      return;
    }
    if (!tempData.email) {
      toast.error("Email diperlukan");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempData.email)) {
      toast.error("Format email tidak valid");
      return;
    }

    if (!tempData.address) {
      toast.error("Alamat diperlukan");
      return;
    }

    try {
      console.log("Memperbarui pengguna dengan data:", tempData);
      await fetchUpdateUser({
        userId: user?.id,
        name: tempData.name,
        email: tempData.email,
        password: tempData.password,
        address: tempData.address,
      });
      toast.success("Pengguna berhasil diperbarui");
      handleCloseModal();
      fetchData();
    } catch (error) {
      console.error("Terjadi kesalahan saat memperbarui data pengguna:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui pengguna";
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
            <span className="sr-only">Open profile menu</span>
            <img
              className="h-10 w-10 rounded-full"
              src={user?.image_url || "/avatar.png"}
              alt="foto profil"
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
                  Hai, {user?.name}!
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
                    Logout
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
          <img
            className="mx-auto mb-8 h-24 w-24 rounded-full border-4 border-blue-400 shadow-sm"
            src={"/avatar.png"}
            alt={user?.name}
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
              placeholder="New password"
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
            placeholder="Wrote your address here.."
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

import React, { useState, useEffect } from "react";
import Table from "@/components/style-components/table";
import SearchBar from "@/components/style-components/navbar/searchbar";
import SpinnerLoad from "@/components/style-components/loading-indicator/spinner-load";
import { fetchUserData, deleteUser } from "@/utils/dataTest";
import EditProfileModal from "@/pages/user/edit";
import { toast } from "react-toastify";

const UserPage = () => {
  const columns = [
    { field: "no", label: "No" },
    { field: "name", label: "Name" },
    { field: "address", label: "Address" },
    { field: "user_role", label: "Role" },
    { field: "action", label: "Action" },
  ];

  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEditUser, setModalEditUser] = useState(null);
  const [searchUser, setSearchUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterUsers(searchUser);
  }, [searchUser, originalData]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const userData = await fetchUserData();
      const roleUserData = userData.filter((user) => user.user_role === "user");
      setOriginalData(roleUserData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching user data:", error);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchUser(value);
  };

  const filterUsers = (valueSearch) => {
    let filteredUsers = originalData;

    if (valueSearch) {
      filteredUsers = originalData.filter(
        (user) =>
          user.name.toLowerCase().includes(valueSearch.toLowerCase()) ||
          user.address.toLowerCase().includes(valueSearch.toLowerCase()),
      );
    }

    setFilteredData(filteredUsers);
  };

  const handleEdit = (user) => {
    setModalEditUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      toast.success("User deleted successfully");

      const updatedData = originalData.filter((user) => user.id !== userId);
      setOriginalData(updatedData);

      filterUsers(searchUser);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalEditUser(null);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="mt-14 rounded-lg p-4 dark:border-gray-700">
        <h1 className="mt-4 text-2xl text-gray-800">User management</h1>
        <p className="mb-6 text-sm font-light text-gray-400">
          Manage your list user
        </p>
        <div className="relative overflow-x-auto">
          <div className="flex flex-wrap items-center justify-between space-y-4 bg-white py-4 md:flex-row md:space-y-0 dark:bg-gray-900">
            <div>
              <SearchBar
                className="ml-2 w-72"
                onChange={handleSearchChange}
                value={searchUser}
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            {isLoading && <SpinnerLoad />}
          </div>
          {!isLoading && (
            <Table
              columns={columns}
              data={filteredData}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalEditUser={modalEditUser}
        fetchData={fetchData}
      />
    </div>
  );
};

export default UserPage;

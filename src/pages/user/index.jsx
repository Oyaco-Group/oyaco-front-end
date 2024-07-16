import React, { useState, useEffect } from "react";
import Table from "@/components/style-components/table";
import Dropdown from "@/components/style-components/dropdown";
import SearchBar from "@/components/style-components/navbar/searchbar";
import Modal from "@/components/style-components/modal";
import SpinnerLoad from "@/components/style-components/loading-indicator/spinner-load";
import { fetchUserData } from "@/utils/fetchData";

const UserPage = () => {
  const columns = [
    { field: "no", label: "No" },
    { field: "name", label: "Name" },
    { field: "address", label: "Address" },
    { field: "role", label: "Role" },
    { field: "action", label: "Action" },
  ];

  const options = [
    { value: "", label: "All role" },
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  const [selectedRole, setSelectedRole] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEditUser, setModalEditUser] = useState(null);
  const [searchUser, setSearchUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const userData = await fetchUserData();
      const processedData = processUserData(userData);
      setOriginalData(processedData);
      setFilteredData(processedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching user data:", error);
    }
  };

  const processUserData = (data) => {
    if (Array.isArray(data)) {
      return data.map((user, index) => ({
        no: index + 1,
        name: user.name,
        address: user.address,
        role: user.user_role,
        ...user,
      }));
    } else {
      throw new Error("Invalid data format from server");
    }
  };

  const handleDropdownSelect = (option) => {
    setSelectedRole(option.value);
    filterUsers(option.value, searchUser);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchUser(value);
    filterUsers(selectedRole, value);
  };

  const filterUsers = (role, valueSearch) => {
    let filteredUsers = originalData;

    if (role) {
      filteredUsers = filteredUsers.filter(
        (user) => user.role.toLowerCase() === role,
      );
    }

    if (valueSearch) {
      filteredUsers = filteredUsers.filter(
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
            <div className="flex items-center gap-4">
              <p>Select role: </p>
              <Dropdown options={options} onSelect={handleDropdownSelect} />
            </div>
            <div>
              <SearchBar
                className="w-72"
                onChange={handleSearchChange}
                value={searchUser}
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            {isLoading && <SpinnerLoad />}
          </div>
          {!isLoading && (
            <Table columns={columns} data={filteredData} onEdit={handleEdit} />
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalEditUser={modalEditUser}
      />
    </div>
  );
};

export default UserPage;

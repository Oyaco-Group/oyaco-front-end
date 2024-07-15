import React, { useState, useEffect } from "react";
import Table from "@/components/style-components/table";
import Dropdown from "@/components/style-components/dropdown";
import SearchBar from "@/components/style-components/navbar/searchbar";
import Modal from "@/components/style-components/modal";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    fetch(
      "https://f0052b42-ecd6-4c80-b3c3-193425202d45.mock.pstmn.io/api/users",
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data.data)) {
          const formattedData = data.data.map((user, index) => ({
            no: index + 1,
            name: user.name,
            address: user.address,
            role: user.user_role,
            ...user,
          }));
          setOriginalData(formattedData);
          setFilteredData(formattedData);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      });
  }, []);

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
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="mt-14 rounded-lg p-4 dark:border-gray-700">
          <h1 className="my-4 text-4xl text-gray-800">List User</h1>
          <div className="relative overflow-x-auto sm:rounded-lg">
            <div className="flex-column flex flex-wrap items-center justify-between space-y-4 bg-white py-4 md:flex-row md:space-y-0 dark:bg-gray-900">
              <div className="flex-column flex flex-wrap items-center">
                <p className="mr-2 font-light">Select role : </p>
                <Dropdown options={options} onSelect={handleDropdownSelect} />
              </div>
              <div className="flex items-center space-x-10">
                <SearchBar
                  className="w-72"
                  onChange={handleSearchChange}
                  value={searchUser}
                />
              </div>
            </div>
            <Table columns={columns} data={filteredData} onEdit={handleEdit} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        editingUser={editingUser}
      />
    </div>
  );
};

export default UserPage;

import React, { useState, useEffect, useCallback } from "react";
import Table from "@/components/style-components/table";
import SearchBar from "@/components/style-components/navbar/searchbar";
import SpinnerLoad from "@/components/style-components/loading-indicator/spinnerLoad";
import { fetchUsers, fetchDeleteUser } from "@/fetching/user";
import EditProfileModal from "@/pages/user/edit";
import { toast } from "react-toastify";
import Pagination from "@/components/style-components/pagination";

const UserPage = () => {
  const columns = [
    { field: "no", label: "No" },
    { field: "name", label: "Name" },
    { field: "address", label: "Address" },
    { field: "user_role", label: "Role" },
    { field: "Edit", label: "Action" },
  ];

  const [userState, setUserState] = useState({
    originalData: [],
    filteredUser: [],
    isModalOpen: false,
    modalEditUser: null,
    searchUser: "",
    isLoading: true,
    page: 1,
    limit: 5,
    totalUsers: 0,
    totalPages: 0,
  });

  useEffect(() => {
    fetchData(userState.page, userState.limit);
  }, [userState.page, userState.limit]);

  useEffect(() => {
    filterUsers(userState.searchUser);
  }, [userState.searchUser, userState.originalData]);

  const fetchData = async (page, limit) => {
    try {
      setUserState((prevState) => ({ ...prevState, isLoading: true }));
      const response = await fetchUsers(page, limit);
      setUserState({
        originalData: response.data,
        filteredUser: response.data,
        isLoading: false,
        totalUsers: response.totalUsers,
        totalPages: response.totalPages,
        page,
        limit,
      });
    } catch (error) {
      toast.error("Failed to fetch user data");
      console.error(error);
    }
  };

  const handleSearchChange = useCallback((event) => {
    setUserState((prevState) => ({
      ...prevState,
      searchUser: event.target.value,
    }));
  }, []);

  const filterUsers = (valueSearch) => {
    if (valueSearch) {
      const filteredUsers = userState.originalData.filter(
        (user) =>
          user.name.toLowerCase().includes(valueSearch.toLowerCase()) ||
          user.address.toLowerCase().includes(valueSearch.toLowerCase())
      );
      setUserState((prevState) => ({
        ...prevState,
        filteredUser: filteredUsers,
      }));
    } else {
      setUserState((prevState) => ({
        ...prevState,
        filteredUser: userState.originalData,
      }));
    }
  };

  const handleEdit = (user) => {
    setUserState((prevState) => ({
      ...prevState,
      modalEditUser: user,
      isModalOpen: true,
    }));
  };

  const handleDelete = async (userId) => {
    try {
      await fetchDeleteUser(userId);
      toast.success("User deleted successfully");

      const updatedData = userState.originalData.filter(
        (user) => user.id !== userId
      );
      setUserState((prevState) => ({
        ...prevState,
        originalData: updatedData,
        filteredUser: updatedData,
        totalUsers: prevState.totalUsers - 1,
      }));

      if (updatedData.length === 0 && userState.page > 1) {
        setUserState((prevState) => ({
          ...prevState,
          page: prevState.page - 1,
        }));
      }
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Error deleting user:", error);
    }
  };

  const closeModal = () => {
    setUserState((prevState) => ({
      ...prevState,
      isModalOpen: false,
      modalEditUser: null,
    }));
    fetchData(userState.page, userState.limit);
  };

  const handlePageChange = (newPage) => {
    setUserState((prevState) => ({ ...prevState, page: newPage }));
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
                id="search-user"
                className="ml-2 w-72"
                onChange={handleSearchChange}
                value={userState.searchUser}
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            {userState.isLoading && <SpinnerLoad />}
          </div>
          {!userState.isLoading && (
            <Table
              columns={columns}
              data={userState.filteredUser}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
      <EditProfileModal
        isOpen={userState.isModalOpen}
        onClose={closeModal}
        modalEditUser={userState.modalEditUser}
        fetchData={() => fetchData(userState.page, userState.limit)}
      />
      <div className="flex justify-between pr-4 pl-4">
        <p className="text-md ml-4 mt-2 font-semibold text-gray-500">
          Total: {userState.totalUsers}
        </p>
        <Pagination
          currentPage={userState.page}
          totalPages={userState.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UserPage;

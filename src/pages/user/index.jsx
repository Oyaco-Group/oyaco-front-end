import React from "react";
import Layout from "@/pages/layout";
import Table from "@/components/style-components/table";

const UserPage1 = () => {
  const columns = [
    { field: "no", label: "No" },
    {
      field: "name",
      label: "Name",
      render: (value, row) => (
        <div className="flex items-center whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
          <img
            className="h-10 w-10 rounded-full"
            src={row.image}
            alt={`${value} image`}
          />
          <div className="ps-3">
            <div className="text-base font-semibold">{value}</div>
            <div className="font-normal text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    { field: "address", label: "Address" },
    { field: "role", label: "Role" },
    { field: "action", label: "Action" },
  ];

  const data = [
    {
      no: 1,
      name: "Thomas Lean",
      image: "/docs/images/people/profile-picture-5.jpg",
      email: "thomes@gmail.com",
      address: "Bali",
      role: "Admin",
      action: (
        <a
          href="#"
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Edit
        </a>
      ),
    },
    {
      no: 2,
      name: "John Doe",
      image: "/docs/images/people/profile-picture-6.jpg",
      email: "john.doe@gmail.com",
      address: "Jakarta",
      role: "User",
      action: (
        <a
          href="#"
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Edit
        </a>
      ),
    },
    {
      no: 3,
      name: "Adolf",
      image: "/docs/images/people/profile-picture-7.jpg",
      email: "adolf@gmail.com",
      address: "Bandung",
      role: "User",
      action: (
        <a
          href="#"
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Edit
        </a>
      ),
    },
    // Other data
  ];

  return (
    <div>
      <Layout />
      <div className="p-4 sm:ml-64">
        <div className="mt-14 rounded-lg p-4 dark:border-gray-700">
          <h1 className="my-4 text-4xl text-gray-800">List User</h1>
          <div className="relative overflow-x-auto sm:rounded-lg">
            <div className="flex-column flex flex-wrap items-center justify-between space-y-4 bg-white py-4 md:flex-row md:space-y-0 dark:bg-gray-900">
              <div>
                <button
                  id="dropdownActionButton"
                  data-dropdown-toggle="dropdownAction"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  type="button"
                >
                  <span className="sr-only">Action button</span>
                  Select Role
                  <svg
                    className="ms-2.5 h-2.5 w-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownAction"
                  className="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownActionButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Reward
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Promote
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Activate account
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Delete User
                    </a>
                  </div>
                </div>
              </div>
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                  <svg
                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  className="block w-80 rounded-lg border border-gray-300 bg-gray-50 ps-10 pt-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Search..."
                />
              </div>
            </div>
            <Table columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage1;

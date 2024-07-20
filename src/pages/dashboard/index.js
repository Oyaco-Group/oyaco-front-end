import React, { useState, useEffect } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { RiShoppingBagLine } from "react-icons/ri";
import { BsChatSquareText } from "react-icons/bs";
import CardCount from "@/components/style-components/card-count";
import Table from "@/components/style-components/table";
import SpinnerLoad from "@/components/style-components/loading-indicator/spinner-load";
import { fetchUserData } from "@/utils/dataTest";

const DashboardPage = () => {
  const tableIncoming = [
    { field: "no", label: "No" },
    { field: "name", label: "Name" },
    { field: "address", label: "Address" },
    { field: "user_role", label: "Role" },
    { field: "action", label: "Action" },
  ];

  const tableOutgoing = [
    { field: "no", label: "No" },
    { field: "name", label: "Name" },
    { field: "address", label: "Address" },
    { field: "user_role", label: "Role" },
    { field: "action", label: "Action" },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

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

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="mt-24">
          <div className="flex flex-col gap-20 body-font container mx-auto my-14 text-gray-700">
            <section>
              <div className="flex flex-row w-1/2 px-20 py-20 border border-0.5 border-gray-100 rounded-3xl bg-blue-100 shadow-md">
                <div className="w-3/4">
                  <p>Welcome</p>
                  <h1 className="text-4xl font-semibold">
                    Hi,{" "}
                    <span className="text-blue-400 font-normal">John Doe</span>
                  </h1>
                </div>
                <img
                  src="/avatar.png"
                  alt="avatar"
                  width={150}
                  height={150}
                  className="1/4"
                />
              </div>
              {/* <div
                id="datepicker-inline"
                inline-datepicker
                data-date="02/25/2024"
                className="w-1/4"
              ></div> */}
            </section>
            <section>
              <div className="flex justify-center text-center">
                <CardCount
                  icon={<BsBoxSeam className="text-2xl" />}
                  count={500}
                  label="Products"
                />
                <CardCount
                  icon={<FiUsers className="text-2xl" />}
                  count={100}
                  label="Users"
                />
                <CardCount
                  icon={<RiShoppingBagLine className="text-2xl" />}
                  count={74}
                  label="Orders"
                />
                <CardCount
                  icon={<BsChatSquareText className="text-2xl" />}
                  count={3}
                  label="Complaints"
                />
              </div>
            </section>
            <section className="flex flex-row">
              <div className="basis-1/2">
                <p>Transaction incoming</p>
                <div className="flex items-center justify-center">
                  {isLoading && <SpinnerLoad />}
                </div>
                {!isLoading && (
                  <Table
                    columns={tableIncoming}
                    data={filteredData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
              </div>
              <div className="basis-1/2">
                <p>Transaction incoming</p>
                <div className="flex items-center justify-center">
                  {isLoading && <SpinnerLoad />}
                </div>
                {!isLoading && (
                  <Table
                    columns={tableIncoming}
                    data={filteredData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

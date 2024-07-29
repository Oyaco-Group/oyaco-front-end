import React, { useState, useEffect } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { RiShoppingBagLine } from "react-icons/ri";
import { BsChatSquareText } from "react-icons/bs";
import CardCount from "@/components/style-components/card-count";
import Table from "@/components/style-components/table";
import LoadingCard from "@/components/style-components/loading-indicator/skeleton-load";
import { fetchDashboard } from "@/fetching/dashboard";
import { fetchProfileUser } from "@/fetching/user";
import { useAuth } from "@/context/auth-context";

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
  const [dashboardData, setDashboardData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { totalUsers, totalMasterProducts, totalOrders, totalComplaints } =
    dashboardData || {};

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
                    <span className="text-blue-400 font-normal">
                      {user ? user.name : "Loading..."}
                    </span>
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
            </section>
            <section>
              <div className="flex items-center justify-center">
                {isLoading && <LoadingCard />}
              </div>
              {!isLoading && (
                <div className="flex justify-center text-center">
                  <CardCount
                    icon={<BsBoxSeam className="text-2xl" />}
                    count={totalMasterProducts}
                    label="Products"
                  />
                  <CardCount
                    icon={<FiUsers className="text-2xl" />}
                    count={totalUsers}
                    label="Users"
                  />
                  <CardCount
                    icon={<RiShoppingBagLine className="text-2xl" />}
                    count={totalOrders}
                    label="Orders"
                  />
                  <CardCount
                    icon={<BsChatSquareText className="text-2xl" />}
                    count={totalComplaints}
                    label="Complaints"
                  />
                </div>
              )}
            </section>
            {/* <section className="flex flex-row">
              <div className="basis-1/2">
                <p>Transaction incoming</p>
                <div className="flex items-center justify-center">
                  {isLoading && <LoadingCard />}
                </div>
                {!isLoading && (
                  <Table
                    columns={tableIncoming}
                    // data={}
                    // onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
              </div>
              <div className="basis-1/2">
                <p>Transaction incoming</p>
                <div className="flex items-center justify-center">
                  {isLoading && <LoadingCard />}
                </div>
                {!isLoading && (
                  <Table
                    columns={tableIncoming}
                    // data={}
                    // onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
              </div>
            </section> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

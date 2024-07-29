import React, { useState, useEffect } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { RiShoppingBagLine } from "react-icons/ri";
import { BsChatSquareText } from "react-icons/bs";
import CardCount from "@/components/style-components/dashboard/cardSummary";
import CardTransaction from "@/components/style-components/dashboard/cardTransaction";
import LoadingCard from "@/components/style-components/loading-indicator/skeletonLoad";
import { fetchDashboard } from "@/fetching/dashboard";
import { useAuth } from "@/context/authContext";
import CalendarComponent from "@/components/style-components/dashboard/calender";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
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

  const {
    totalUsers = 0,
    totalMasterProducts = 0,
    totalOrders = 0,
    totalComplaints = 0,
    productMovements = [],
  } = dashboardData;

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="mt-24">
          <div className="flex flex-col gap-10 body-font container mx-auto my-14 text-gray-700">
            <section>
              <div className="flex flex-row">
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
                <div className="w-1/2">
                  <CalendarComponent />
                </div>
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
            <section className="flex flex-row gap-10">
              {!isLoading && (
                <CardTransaction transactions={productMovements} />
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

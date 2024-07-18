import React from "react";
import CardCount from "@/components/style-components/card-count";

const DashboardPage = () => {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="mt-24 rounded-lg">
          <div className="body-font container mx-auto my-14 text-gray-700">
            <div className="-m-4 flex flex-wrap text-center">
              <CardCount
                icon={<path d="M8 17l4 4 4-4m-4-5v9"></path>}
                count={500}
                label="Product"
              />
              <CardCount
                icon={<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>}
                count={100}
                label="Users"
              />
              <CardCount
                icon={<path d="M3 18v-6a9 9 0 0118 0v6"></path>}
                count={74}
                label="Order"
              />
              <CardCount
                icon={
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                }
                count={46}
                label="Complain"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

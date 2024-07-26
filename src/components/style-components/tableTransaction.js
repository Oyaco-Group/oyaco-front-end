import React from "react";
import Button from "@/components/style-components/button";

const TableTransaction = ({ columns, data = [], onEdit }) => {
  const totalData = data.length;

  return (
    <div>
      <div className="overflow-x-auto overflow-y-auto rounded-lg border shadow-md">
        <table className="w-full min-w-max text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-blue-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="whitespace-nowrap px-6 py-3"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((order, index) => (
                <tr key={index} className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="whitespace-nowrap px-6 py-4">
                      {order[column.field]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-6 text-center text-gray-400">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-md ml-4 mt-2 font-semibold text-gray-500">
        Total : {totalData}
      </p>
    </div>
  );
};

export default TableTransaction;

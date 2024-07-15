import React from "react";
import Button from "@/components/style-components/button";

const Table = ({ columns, data, onEdit }) => {
  return (
    <div className="mb-20 overflow-x-auto overflow-y-auto rounded-lg border shadow-md">
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
          {Array.isArray(data) && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="whitespace-nowrap px-6 py-4">
                    {column.field === "action" ? (
                      <Button onClick={() => onEdit(row)} size="sm">
                        Edit
                      </Button>
                    ) : column.render ? (
                      column.render(row[column.field], row)
                    ) : (
                      row[column.field]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-6 text-center text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

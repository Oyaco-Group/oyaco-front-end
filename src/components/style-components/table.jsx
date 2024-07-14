import React from "react";

const Table = ({ columns, data }) => {
  return (
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
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="whitespace-nowrap px-6 py-4">
                  {column.render
                    ? column.render(row[column.field], row)
                    : row[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

import React from "react";
import Button from "@/components/style-components/button";

const TableOrder = ({ columns, data = [], onDetail, onChange ,onEdit, sendOrder, onComplaint }) => {
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
              data.map((order, index) => 
                  <tr key={index}
                      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                      <td className="whitespace-nowrap px-6 py-4">
                          {index+1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{order.created_at}</td>
                      <td className="whitespace-nowrap px-6 py-4">{order.order_status}</td>
                      <td className="whitespace-nowrap px-6 py-4">{order.buyer_status}</td>
                      <td className="whitespace-nowrap px-6 py-4">{order.payment_type}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-left">
                      {/* { order.complaint === null ? order.order_status : order.complaint.iscomplaint === true ? 
                            (<a className="font-medium text-red-600 dark:text-blue-500 hover:underline" href={`/complaint/${order.id}`}>
                              Complaint!!!
                            </a>) :  order.order_status
                          } */}
                        
                        {order.order_status.toLowerCase() === 'confirmed yet' ? 
                          <Button className="bg-green-400 hover:bg-green-500" size="sm" onClick={() => onChange(order.id)}>Confirm</Button> 
                          : order.order_status.toLowerCase() === 'confirmed' ?
                          <Button className="bg-orange-400 hover:bg-orange-500" size="sm" onClick={() => onEdit(order.id)}>Edit</Button>
                          : order.order_status.toLowerCase() === 'on delivery' ?
                          <Button className="bg-blue-400 hover:bg-blue-500" size="sm" onClick={() => onDetail(order.id)}>Detail</Button>
                          : 
                          <Button className="bg-red-500 hover:bg-red-600" size="sm" onClick={() => onComplaint(order.id)}>Complaint</Button>
                        }
                      </td>
                      <td>
                        {order.order_status.toLowerCase() === 'confirmed' ?
                      <Button className="bg-blue-400 hover:bg-blue-500" size="sm" onClick={() => sendOrder(order.id)}>Add Resi</Button> :
                      <Button className="bg-blue-400 hover:bg-blue-500" size="sm" onClick={() => sendOrder()} disabled={true}>Add Resi</Button> 
                        }
                      </td>
                  </tr>
              )

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
      <p className="text-md ml-4 mt-2 font-semibold text-gray-500">
        Total : {totalData}
      </p>
    </div>
  );
};

export default TableOrder;

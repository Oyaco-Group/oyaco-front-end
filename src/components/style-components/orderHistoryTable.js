const OrderHistoryTable = ({ orders }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              User ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Payment Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Order Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Buyer Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Created At
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                {order.id}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {order.user_id}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {order.payment_type}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {order.order_status}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {order.buyer_status}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {new Date(order.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;

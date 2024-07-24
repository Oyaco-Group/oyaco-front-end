import React from "react";

const OrderHistoryTable = ({ orders }) => {
  return (
    <div>
      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Payment Type</th>
            <th>Order Status</th>
            <th>Buyer Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.orderDate}</td>
              <td>${order.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;

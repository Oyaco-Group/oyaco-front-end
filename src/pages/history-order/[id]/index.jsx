"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchOrderHistoryById } from "@/fetching/orderHistory";
import OrderCard from "@/components/style-components/orderCard";

const HistoryOrderPage = ({ initialOrders }) => {
  const router = useRouter();
  const { id } = router.query;

  const [orders, setOrders] = useState(initialOrders || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true)
        const data = await fetchOrderHistoryById(id);
        setOrders(data);
        setLoading(false)
      }
    };
    fetchData();
  }, [id]);

  const handleOrderDetail = (orderId) => {
    console.log("Order Detail clicked for order ID:", orderId);
  };

  const handleComplaint = (orderId) => {
    console.log("Complaint clicked for order ID:", orderId);
  };

  const handleUpdateStatus = (orderId) => {
    console.log("Update Status Pesanan clicked for order ID:", orderId);
  };

  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="mt-14 rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
          <h1 className="text-4xl mt-10 mb-10">History Order Page</h1>
          <div className="grid grid-cols-1 gap-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onOrderDetail={handleOrderDetail}
                onComplaint={handleComplaint}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryOrderPage;

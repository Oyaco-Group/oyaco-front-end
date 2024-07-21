"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchOrderHistoryDetailById } from "@/fetching/orderHistory";
import CardOrderDetail from "@/components/style-components/orderDetailCard";

const HistoryOrderDetailPage = ({ initialOrders }) => {
  const router = useRouter();
  const { order_id } = router.query;

  const [orders, setOrders] = useState(initialOrders || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (order_id) {
        setLoading(true);
        const data = await fetchOrderHistoryDetailById(order_id);
        setOrders(data);
        setLoading(false);
      }
    };
    fetchData();
  }, [order_id]);

  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="mt-14 rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
          <h1 className="text-4xl mt-10 mb-10">History Order Detail Page</h1>
          {orders.map((order) => (
            <div key={order.id} className="col-md-6 mb-4">
              <CardOrderDetail orders={orders} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryOrderDetailPage;

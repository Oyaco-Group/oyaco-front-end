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
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (order_id) {
        setLoading(true);
        const data = await fetchOrderHistoryDetailById(order_id);
        setOrders(data);
        calculateTotalPayment(data);
        setLoading(false);
      }
    };
    fetchData();
  }, [order_id]);

  const calculateTotalPayment = (orders) => {
    let total = 0;
    orders.forEach((order) => {
      const { quantity, master_product } = order;
      const { price } = master_product;
      total += quantity * price;
    });
    setTotalPayment(total);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="mt-14 rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
        <h1 className="text-4xl mt-10 mb-10">History Order Detail Page</h1>
        {orders.map((order) => (
          <div key={order.id} className="mb-8">
            <CardOrderDetail orders={[order]} />
          </div>
        ))}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg border-t border-gray-200">
          <h5 className="font-bold text-gray-800">Total Payment</h5>
          <p className="text-gray-700">Rp{totalPayment}</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryOrderDetailPage;
